import authorizedRequests from '@/http/index';
import EndPoints from '@/http/EndPoints';
import axios from 'axios';
import { EditTeacher } from '@/types/edit.site.types';

export const requestCreateTeacher = async (body: FormData) => {
  const response = await authorizedRequests.post(EndPoints.TEACHER, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestUpdateTeacher = async (teacher: EditTeacher, id: string) => {
  const response = await authorizedRequests.put(
    `${EndPoints.TEACHER}/${id}`,
    JSON.stringify(teacher),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

export const requestUpdateTeacherImg = async (body: FormData, id: string) => {
  const response = await authorizedRequests.patch(`${EndPoints.TEACHER}/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestUpdateTeacherPosition = async (position: number, id: string) => {
  const response = await authorizedRequests.patch(`${EndPoints.TEACHER}/${id}`, {}, {
    params: {
      pos: position,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const requestDeleteTeacher = async (id: string) => {
  const response = await authorizedRequests.delete(`${EndPoints.TEACHER}/${id}`);
  return response.data;
};

export const requestGetTeacher = async (skip?: number, size?: number) => {
  const response = await axios.get(EndPoints.TEACHER, {
    params: {
      skip,
      size,
    },
  });

  return response.data;
};
