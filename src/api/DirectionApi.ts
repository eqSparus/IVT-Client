import authorizedRequests from '@/api/request/AuthorizedRequests';
import { Direction } from '@/types/SiteContentTypes';
import EndPoints from '@/api/EndPoints';

export const requestCreateDirection = async (direction: Omit<Direction, 'position'>) => {
  const response = await authorizedRequests.post(EndPoints.DIRECTION, JSON.stringify(direction), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestUpdateDirection = async (direction: Omit<Direction, 'position'>) => {
  const response = await authorizedRequests.put(EndPoints.DIRECTION, JSON.stringify(direction), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestDeleteDirection = async (id: string) => authorizedRequests.delete(EndPoints.DIRECTION, {
  params: {
    id,
  },
});

export const requestSwapPosition = async (firstId: string, lastId: string) => {
  const response = await authorizedRequests.patch(EndPoints.DIRECTION, {}, {
    params: {
      firstId,
      lastId,
    },
  });
  return response.data;
};
