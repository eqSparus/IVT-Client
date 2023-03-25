import axios from 'axios';
import EndPoints from '@/api/EndPoints';

export const getData = async () => {
  const response = await axios.get(EndPoints.DATA);
  return response.data;
};

export default getData;
