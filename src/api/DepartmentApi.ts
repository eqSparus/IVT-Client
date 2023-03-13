import { InformationDepartment } from '@/api/model/ModelTypes';
import authorizedRequests from '@/api/request/AuthorizedRequests';

const updateDepartment = async (department: InformationDepartment) => {
  const response = await authorizedRequests.put('/department', JSON.stringify(department), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default updateDepartment;
