import AuthorizedRequests from '@/api/request/AuthorizedRequests';

export const exit = async (token: string) => {
  const response = await AuthorizedRequests.post('/exit', JSON.stringify({ token }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const changePassword = async (password: string) => {
  const response = await AuthorizedRequests.post('/change/password', JSON.stringify({ password }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const sendChangeEmail = async (email: string) => {
  const response = await AuthorizedRequests.post('/change/email', JSON.stringify({ email }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const changeEmailByToken = async (token: string) => {
  const response = await AuthorizedRequests.post('/change/email', {}, {
    params: {
      token,
    },
  });
  return response.data;
};
