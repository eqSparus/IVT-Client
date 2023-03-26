import { Department } from '@/types/SiteContentTypes';
import authorizedRequests from '@/api/request/AuthorizedRequests';
import EndPoints from '@/api/EndPoints';

const requestUpdateDepartment = async (department: Department) => {
  const response = await authorizedRequests.put(EndPoints.DEPARTMENT, JSON.stringify(department), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default requestUpdateDepartment;
