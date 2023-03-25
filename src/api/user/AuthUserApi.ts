import AuthorizedRequests from '@/api/request/AuthorizedRequests';
import UserEndPoints from '@/api/user/UserEndPoints';

export const requestExit = async () => {
  const response = await AuthorizedRequests.post(UserEndPoints.EXIT, {}, {
    withCredentials: true,
  });
  return response.data;
};

export const requestChangePassword = async (password: string) => {
  const response = await AuthorizedRequests.post(UserEndPoints.CHANGE_PASSWORD, JSON.stringify({ password }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestSendChangeEmail = async (email: string) => {
  const response = await AuthorizedRequests.post(UserEndPoints.CHANGE_EMAIL, JSON.stringify({ email }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const changeEmailByToken = async (token: string) => {
  const response = await AuthorizedRequests.post(UserEndPoints.CHANGE_EMAIL, {}, {
    params: {
      token,
    },
  });
  return response.data;
};
