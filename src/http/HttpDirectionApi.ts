import authorizedRequests from '@/http/index';
import EndPoints from '@/http/EndPoints';
import { EditDirection } from '@/types/edit.site.types';

export const requestCreateDirection = async (direction: EditDirection) => {
  const response = await authorizedRequests.post(EndPoints.DIRECTION, JSON.stringify(direction), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestUpdateDirection = async (direction: EditDirection, id: string) => {
  const response = await authorizedRequests.put(`${EndPoints.DIRECTION}/${id}`, JSON.stringify(direction), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestDeleteDirection = async (id: string) => authorizedRequests.delete(`${EndPoints.DIRECTION}/${id}`);

export const requestSwapPosition = async (firstId: string, lastId: string) => {
  const response = await authorizedRequests.patch(EndPoints.DIRECTION, {}, {
    params: {
      firstId,
      lastId,
    },
  });
  return response.data;
};
