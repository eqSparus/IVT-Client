import authorizedRequests from '@/http/index';
import EndPoints from '@/http/EndPoints';
import { EditEntrant } from '@/types/edit.site.types';

export const requestCreateEntrant = async (entrant: EditEntrant) => {
  const response = await authorizedRequests.post(EndPoints.ENTRANT, JSON.stringify(entrant), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestUpdateEntrant = async (entrant: EditEntrant, id: string) => {
  const response = await authorizedRequests.put(`${EndPoints.ENTRANT}/${id}`, JSON.stringify(entrant), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestDeleteEntrant = async (id: string) => {
  const response = await authorizedRequests.delete(`${EndPoints.ENTRANT}/${id}`);
  return response.data;
};
