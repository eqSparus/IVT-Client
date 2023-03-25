import authorizedRequests from '@/api/request/AuthorizedRequests';
import { Teacher } from '@/types/SiteContentTypes';
import EndPoints from '@/api/EndPoints';

export const createTeacher = async (body: FormData) => {
  const response = await authorizedRequests.post(EndPoints.TEACHER, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateTeacher = async (teacher: Teacher) => {
  const response = await authorizedRequests.put(EndPoints.TEACHER, JSON.stringify(teacher), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateTeacherImg = async (body: FormData, id: string) => {
  const response = await authorizedRequests.patch(EndPoints.TEACHER, body, {
    params: {
      id,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteTeacher = async (id: string) => {
  const response = await authorizedRequests.delete(EndPoints.TEACHER, {
    params: {
      id,
    },
  });
  return response.data;
};
