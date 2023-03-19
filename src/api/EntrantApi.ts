import authorizedRequests from '@/api/request/AuthorizedRequests';
import { Entrant } from '@/api/model/ModelTypes';

const END_POINT_ENTRANT = '/entrant';

export const createEntrant = async (entrant: Entrant) => {
  const response = await authorizedRequests.post(END_POINT_ENTRANT, JSON.stringify({
    title: entrant.title,
    items: entrant.items,
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const putEntrant = async (entrant: Entrant, id: string) => {
  const response = await authorizedRequests.put(END_POINT_ENTRANT, JSON.stringify({
    title: entrant.title,
    items: entrant.items,
  }), {
    params: {
      id,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteEntrant = async (id: string) => {
  const response = await authorizedRequests.delete(END_POINT_ENTRANT, {
    params: {
      id,
    },
  });
  return response.data;
};
