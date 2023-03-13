import authorizedRequests from '@/api/request/AuthorizedRequests';
import { InformationDirection } from '@/api/model/ModelTypes';

export const createDirection = async (direction: InformationDirection) => {
  const response = await authorizedRequests.post('/direction', JSON.stringify({
    title: direction.title,
    degree: direction.degree,
    form: direction.form,
    duration: direction.duration,
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const putDirection = async (direction: InformationDirection) => {
  const response = await authorizedRequests.put('/direction', JSON.stringify({
    title: direction.title,
    degree: direction.degree,
    form: direction.form,
    duration: direction.duration,
  }), {
    params: {
      id: direction.id,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteDirection = async (id: string) => authorizedRequests.delete('/direction', {
  params: {
    id,
  },
});
