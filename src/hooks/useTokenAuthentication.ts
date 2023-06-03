import { computed, ref } from 'vue';
import { requestRefreshToken, requestAuthentication } from '@/http/user/HttpСredentialsApi';
import { User } from '@/types/user.types';

const LOCAL_ACCESS_TOKEN = 'access';
const accessToken = ref<string | null>(localStorage.getItem(LOCAL_ACCESS_TOKEN));

const useTokenAuthentication = () => {
  const isAuth = computed<boolean>(() => accessToken.value !== null);

  const login = async (user: User) => {
    const data = await requestAuthentication({
      email: user.email,
      password: user.password,
    });
    accessToken.value = data.accessToken;
    localStorage.setItem(LOCAL_ACCESS_TOKEN, data.accessToken);
  };

  const refreshToken = async () => {
    const data = await requestRefreshToken();
    accessToken.value = data.accessToken;
  };

  const logout = () => {
    accessToken.value = null;
    localStorage.removeItem(LOCAL_ACCESS_TOKEN);
  };

  return {
    accessToken,
    login,
    logout,
    refreshToken,
    isAuth,
  };
};

export default useTokenAuthentication;
