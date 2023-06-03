import axios from 'axios';
import useTokenAuthentication from '@/hooks/useTokenAuthentication';

// TODO заменить
const BASE_URL = 'http://localhost:8080/api/v1';

axios.defaults.baseURL = BASE_URL;

const AuthorizedRequest = axios.create();
const {
  accessToken,
  refreshToken,
  logout,
} = useTokenAuthentication();

AuthorizedRequest.interceptors.request.use((config) => {
  const configuration = config;
  configuration.headers.Authorization = `Bearer_${accessToken.value}`;
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
    await refreshToken();
    config.headers.Authorization = accessToken.value;
    return AuthorizedRequest(config)
      .catch(() => logout());
  } catch (e) {
    logout();
    return Promise.reject(error);
  }
});

export default AuthorizedRequest;
