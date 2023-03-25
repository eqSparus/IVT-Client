import authorizedRequests from '@/api/request/AuthorizedRequests';
import { AboutDepartment } from '@/types/SiteContentTypes';
import EndPoints from '@/api/EndPoints';

const putAboutDepartment = async (about: AboutDepartment) => {
  const response = await authorizedRequests.put(EndPoints.ABOUT, JSON.stringify(about), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default putAboutDepartment;
