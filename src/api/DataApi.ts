import axios from 'axios';

export const getData = async () => {
  const response = await axios.get('/data');
  return response.data;
};

export default getData;
