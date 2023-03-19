import authorizedRequests from '@/api/request/AuthorizedRequests';
import { Teacher } from '@/api/model/ModelTypes';

const ENT_POINT_TEACHER = '/teacher';

export const createTeacher = async (body: FormData) => {
  const response = await authorizedRequests.post(ENT_POINT_TEACHER, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateTeacher = async (teacher: Teacher) => {
  const response = await authorizedRequests.put(ENT_POINT_TEACHER, JSON.stringify({
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    middleName: teacher.middleName,
    post: teacher.post,
    scientificDegree: teacher.scientificDegree,
  }), {
    params: {
      id: teacher.id,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateTeacherImg = async (body: FormData, id: string) => {
  const response = await authorizedRequests.patch(ENT_POINT_TEACHER, body, {
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
  const response = await authorizedRequests.delete(ENT_POINT_TEACHER, {
    params: {
      id,
    },
  });
  return response.data;
};
