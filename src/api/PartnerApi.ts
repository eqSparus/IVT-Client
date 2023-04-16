import authorizedRequests from '@/api/request/AuthorizedRequests';
import EndPoints from '@/api/EndPoints';
import { Partner } from '@/types/site.types';

export const requestCreatePartner = async (body: FormData) => {
  const response = await authorizedRequests.post(EndPoints.PARTNER, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestUpdatePartner = async (teacher: Omit<Partner, 'urlImg'>) => {
  const response = await authorizedRequests.put(EndPoints.PARTNER, JSON.stringify(teacher), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestUpdatePartnerImg = async (body: FormData, id: string) => {
  const response = await authorizedRequests.patch(EndPoints.PARTNER, body, {
    params: {
      id,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestDeletePartner = async (id: string) => {
  const response = await authorizedRequests.delete(EndPoints.PARTNER, {
    params: {
      id,
    },
  });
  return response.data;
};
