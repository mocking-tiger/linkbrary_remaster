import { BASE_URL } from './constants/url';
import instance from './instance/default-instance';

export const getLinks = async () => {
  const response = await instance.get(`${BASE_URL}links`);
  return response.data.data.folder;
};
