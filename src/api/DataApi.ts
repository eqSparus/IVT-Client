import axios from 'axios';
import EndPoints from '@/api/EndPoints';

export const requestGetData = async () => {
  const response = await axios.get(EndPoints.DATA);
  return response.data;
};

export default requestGetData;
