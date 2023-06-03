import authorizedRequests from '@/http/index';
import { Link } from '@/types/site.types';
import EndPoints from '@/http/EndPoints';

export const requestCreateLink = async (link: Link) => {
  const response = await authorizedRequests.post(EndPoints.SITE_LINK, JSON.stringify(link), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestUpdateLink = async (link: Link) => {
  const response = await authorizedRequests.put(EndPoints.SITE_LINK, JSON.stringify(link), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestDeleteLink = async (id: string) => authorizedRequests.delete(EndPoints.SITE_LINK, {
  params: {
    id,
  },
});
