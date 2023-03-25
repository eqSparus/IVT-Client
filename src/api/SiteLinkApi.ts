import authorizedRequests from '@/api/request/AuthorizedRequests';
import { Link } from '@/types/SiteContentTypes';
import EndPoints from '@/api/EndPoints';

export const createLink = async (link: Link) => {
  const response = await authorizedRequests.post(EndPoints.SITE_LINK, JSON.stringify(link), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const putLink = async (link: Link) => {
  const response = await authorizedRequests.put(EndPoints.SITE_LINK, JSON.stringify(link), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteLink = async (id: string) => authorizedRequests.delete(EndPoints.SITE_LINK, {
  params: {
    id,
  },
});
