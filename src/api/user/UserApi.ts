import axios from 'axios';
import { User } from '@/types/UserTypes';
import UserEndPoints from '@/api/user/UserEndPoints';

export const authentication = async (user: User) => {
  const response = await axios.post(UserEndPoints.LOGIN, JSON.stringify(user), {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const sendRecoverPasswordEmail = async (email: string) => {
  const response = await axios.post(UserEndPoints.RECOVER_PASSWORD, {}, {
    params: {
      email,
    },
  });
  return response.data;
};

export const recoverPasswordByToken = async (password: string, token: string) => {
  const response = await axios.post(UserEndPoints.RECOVER_PASSWORD, JSON.stringify({ password }), {
    params: {
      token,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const refreshToken = async () => {
  const response = await axios.post(UserEndPoints.REFRESH_TOKEN, {}, {
    withCredentials: true,
  });
  return response.data;
};
