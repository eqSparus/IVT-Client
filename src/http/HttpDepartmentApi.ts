import { Department } from '@/types/site.types';
import authorizedRequests from '@/http/index';
import EndPoints from '@/http/EndPoints';

const requestUpdateDepartment = async (department: Department) => {
  const response = await authorizedRequests.put(EndPoints.DEPARTMENT, JSON.stringify(department), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default requestUpdateDepartment;
