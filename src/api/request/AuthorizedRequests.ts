import axios from 'axios';
import store from '@/plugins/store/Store';
import { refreshToken } from '@/api/user/UserApi';

const BASE_URL = 'http://localhost:8080/api/v1';

axios.defaults.baseURL = BASE_URL;

const AuthorizedRequest = axios.create();

AuthorizedRequest.interceptors.request.use((config) => {
  const configuration = config;
  configuration.headers.Authorization = `Bearer_${store.getters['auth/getAccessToken']}`;
  return configuration;
});

AuthorizedRequest.interceptors.response.use((response) => response, async (error) => {
  const {
    response,
    config,
  } = error;

  const storeRefreshToken = store.getters['auth/getRefreshToken'];

  if (response.status !== 401 || !storeRefreshToken) {
    return Promise.reject(error);
  }

  try {
    const data = await refreshToken(storeRefreshToken);
    store.commit('auth/setTokens', {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    config.headers.Authorization = data.accessToken;
    if (config.url === '/exit') {
      config.data = JSON.stringify({ token: data.refreshToken });
    }
    return AuthorizedRequest(config)
      .catch(() => store.commit('auth/removeTokens'));
  } catch (e) {
    store.commit('auth/removeTokens');
    return Promise.reject(error);
  }
});

export default AuthorizedRequest;
