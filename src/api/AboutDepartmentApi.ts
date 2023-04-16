import authorizedRequests from '@/api/request/AuthorizedRequests';
import { AboutDepartment } from '@/types/site.types';
import EndPoints from '@/api/EndPoints';

const requestUpdateAboutDepartment = async (about: AboutDepartment) => {
  const response = await authorizedRequests.put(EndPoints.ABOUT, JSON.stringify(about), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default requestUpdateAboutDepartment;
