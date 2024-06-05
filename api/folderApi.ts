import { BASE_URL } from './constants/url';
import instance from './instance/default-instance';

export const getFolders = async () => {
  const response = await instance.get(`${BASE_URL}folders`);
  return response.data.data.folder;
};
