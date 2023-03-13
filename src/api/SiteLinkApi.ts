import authorizedRequests from '@/api/request/AuthorizedRequests';
import { Link } from '@/api/model/ModelTypes';

export const createLink = async (href: string, icon: string) => {
  const response = await authorizedRequests.post('/link', JSON.stringify({
    href,
    icon,
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const putLink = async (link: Link) => {
  const response = await authorizedRequests.put('/link', JSON.stringify({
    href: link.href,
    icon: link.icon,
  }), {
    params: {
      id: link.id,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteLink = async (id: string) => authorizedRequests.delete('/link', {
  params: {
    id,
  },
});
