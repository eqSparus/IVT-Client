import axios from 'axios';
import EndPoints from '@/http/EndPoints';

export const requestGetData = async () => {
  const response = await axios.get(EndPoints.DATA);
  return response.data;
};

export default requestGetData;
