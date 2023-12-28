import authorizedRequests from '@/http/index';
import EndPoints from '@/http/EndPoints';
import { EditPartner } from '@/types/edit.site.types';

export const requestCreatePartner = async (body: FormData) => {
  const response = await authorizedRequests.post(EndPoints.PARTNER, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestUpdatePartner = async (teacher: EditPartner, id: string) => {
  const response = await authorizedRequests.put(`${EndPoints.PARTNER}/${id}`, JSON.stringify(teacher), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestUpdatePartnerImg = async (body: FormData, id: string) => {
  const response = await authorizedRequests.patch(`${EndPoints.PARTNER}/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestDeletePartner = async (id: string) => {
  const response = await authorizedRequests.delete(`${EndPoints.PARTNER}/${id}`);
  return response.data;
};
