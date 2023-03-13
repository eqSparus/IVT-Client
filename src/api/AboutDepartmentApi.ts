import authorizedRequests from '@/api/request/AuthorizedRequests';
import { AboutDepartment } from '@/api/model/ModelTypes';

const putAboutDepartment = async (about: AboutDepartment) => {
  const response = await authorizedRequests.put('/about', JSON.stringify({
    title: about.title,
    description: about.description,
  }), {
    params: {
      id: about.id,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default putAboutDepartment;
