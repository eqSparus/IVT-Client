import authorizedRequests from '@/api/request/AuthorizedRequests';
import EndPoints from '@/api/EndPoints';
import { Review } from '@/types/site.types';

export const requestCreateReview = async (body: FormData) => {
  const response = await authorizedRequests.post(EndPoints.REVIEW, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestUpdateReview = async (review: Omit<Review, 'urlImg'>) => {
  const response = await authorizedRequests.put(EndPoints.REVIEW, JSON.stringify(review), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestUpdateReviewImg = async (body: FormData, id: string) => {
  const response = await authorizedRequests.patch(EndPoints.REVIEW, body, {
    params: {
      id,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestDeleteReview = async (id: string) => {
  const response = await authorizedRequests.delete(EndPoints.REVIEW, {
    params: {
      id,
    },
  });
  return response.data;
};
