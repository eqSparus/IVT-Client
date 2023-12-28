import authorizedRequests from '@/http/index';
import EndPoints from '@/http/EndPoints';
import { EditReview } from '@/types/edit.site.types';

export const requestCreateReview = async (body: FormData) => {
  const response = await authorizedRequests.post(EndPoints.REVIEW, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestUpdateReview = async (review: EditReview, id: string) => {
  const response = await authorizedRequests.put(`${EndPoints.REVIEW}/${id}`, JSON.stringify(review), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestUpdateReviewImg = async (body: FormData, id: string) => {
  const response = await authorizedRequests.patch(`${EndPoints.REVIEW}/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestDeleteReview = async (id: string) => {
  const response = await authorizedRequests.delete(`${EndPoints.REVIEW}/${id}`);
  return response.data;
};
