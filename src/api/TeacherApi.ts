import authorizedRequests from '@/api/request/AuthorizedRequests';
import { Teacher } from '@/types/site.types';
import EndPoints from '@/api/EndPoints';

export const requestCreateTeacher = async (body: FormData) => {
  const response = await authorizedRequests.post(EndPoints.TEACHER, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestUpdateTeacher = async (teacher: Omit<Teacher, 'urlImg' | 'position'>) => {
  const response = await authorizedRequests.put(EndPoints.TEACHER, JSON.stringify(teacher), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const requestUpdateTeacherImg = async (body: FormData, id: string) => {
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

export const requestUpdateTeacherPosition = async (position: number, id: string) => {
  const response = await authorizedRequests.patch(EndPoints.TEACHER, {}, {
    params: {
      id,
      position,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestDeleteTeacher = async (id: string) => {
  const response = await authorizedRequests.delete(EndPoints.TEACHER, {
    params: {
      id,
    },
  });
  return response.data;
};

export const requestGetTeacher = async (skip?: number, size?: number) => {
  const response = await authorizedRequests.get(EndPoints.TEACHER, {
    params: {
      skip,
      size,
    },
  });

  return response.data;
};
