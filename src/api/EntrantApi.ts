import authorizedRequests from '@/api/request/AuthorizedRequests';
import { Entrant } from '@/types/site.types';
import EndPoints from '@/api/EndPoints';

export const requestCreateEntrant = async (entrant: Entrant) => {
  const response = await authorizedRequests.post(EndPoints.ENTRANT, JSON.stringify(entrant), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestUpdateEntrant = async (entrant: Entrant) => {
  const response = await authorizedRequests.put(EndPoints.ENTRANT, JSON.stringify(entrant), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestDeleteEntrant = async (id: string) => {
  const response = await authorizedRequests.delete(EndPoints.ENTRANT, {
    params: {
      id,
    },
  });
  return response.data;
};
