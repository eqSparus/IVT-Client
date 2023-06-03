import authorizedRequests from '@/http/index';
import { AboutDepartment } from '@/types/site.types';
import EndPoints from '@/http/EndPoints';

const requestUpdateAboutDepartment = async (about: AboutDepartment) => {
  const response = await authorizedRequests.put(EndPoints.ABOUT, JSON.stringify(about), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default requestUpdateAboutDepartment;
