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

  if (response.status !== 401) {
    return Promise.reject(error);
  }

  try {
    const data = await refreshToken();
    store.commit('auth/setAccessToken', data.accessToken);
    config.headers.Authorization = data.accessToken;
    return AuthorizedRequest(config)
      .catch(() => store.commit('auth/removeAccessToken'));
  } catch (e) {
    store.commit('auth/removeAccessToken');
    return Promise.reject(error);
  }
});

export default AuthorizedRequest;
