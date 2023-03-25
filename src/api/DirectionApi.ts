import authorizedRequests from '@/api/request/AuthorizedRequests';
import { Direction } from '@/types/SiteContentTypes';
import EndPoints from '@/api/EndPoints';

export const createDirection = async (direction: Direction) => {
  const response = await authorizedRequests.post(EndPoints.DIRECTION, JSON.stringify(direction), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const putDirection = async (direction: Direction) => {
  const response = await authorizedRequests.put(EndPoints.DIRECTION, JSON.stringify(direction), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteDirection = async (id: string) => authorizedRequests.delete(EndPoints.DIRECTION, {
  params: {
    id,
  },
});
