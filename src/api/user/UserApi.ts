import axios from 'axios';
import { User } from '@/api/model/ModelTypes';

export const authentication = async (user: User) => {
  const response = await axios.post('/login', JSON.stringify(user), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const sendRecoverPasswordEmail = async (email: string) => {
  const response = await axios.post('/recover/pass', {}, {
    params: {
      email,
    },
  });
  return response.data;
};

export const recoverPasswordByToken = async (password: string, token: string) => {
  const response = await axios.post('/recover/pass', JSON.stringify({ password }), {
    params: {
      token,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const refreshToken = async (token: string) => {
  const response = await axios.post('/refresh', JSON.stringify({ token }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
