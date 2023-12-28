import authorizedRequests from '@/http/index';
import EndPoints from '@/http/EndPoints';
import { EditAboutDepartment } from '@/types/edit.site.types';

const requestUpdateAboutDepartment = async (about: EditAboutDepartment, id: string) => {
  const response = await authorizedRequests.put(`${EndPoints.ABOUT}/${id}`, JSON.stringify(about), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default requestUpdateAboutDepartment;
