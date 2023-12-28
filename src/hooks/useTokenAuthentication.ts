import { computed, ref } from 'vue';
import { requestRefreshToken, requestAuthentication } from '@/http/user/HttpСredentialsApi';
import { User } from '@/types/user.types';

const LOCAL_ACCESS_TOKEN = 'access';
const LOCAL_EXPIRATION_TOKEN = 'expiration';
const accessToken = ref<string | null>(localStorage.getItem(LOCAL_ACCESS_TOKEN));
const expirationAccessToken = ref<string | null>(localStorage.getItem(LOCAL_EXPIRATION_TOKEN));

const useTokenAuthentication = () => {
  const isAuth = computed<boolean>(() => accessToken.value !== null);

  const isExpiration = computed<boolean>(() => expirationAccessToken.value !== null
    && parseInt(expirationAccessToken.value, 10) > Date.now());

  const login = async (user: User) => {
    const data = await requestAuthentication({
      email: user.email,
      password: user.password,
    });
    accessToken.value = data.accessToken;
    expirationAccessToken.value = data.expiration;
    localStorage.setItem(LOCAL_ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(LOCAL_EXPIRATION_TOKEN, data.expiration);
  };

  const refreshToken = async () => {
    const data = await requestRefreshToken();
    accessToken.value = data.accessToken;
    expirationAccessToken.value = data.expiration;
    localStorage.setItem(LOCAL_ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(LOCAL_EXPIRATION_TOKEN, data.expiration);
  };

  const logout = () => {
    accessToken.value = null;
    expirationAccessToken.value = null;
    localStorage.removeItem(LOCAL_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_EXPIRATION_TOKEN);
  };

  return {
    accessToken,
    login,
    logout,
    refreshToken,
    isAuth,
    isExpiration,
  };
};

export default useTokenAuthentication;
