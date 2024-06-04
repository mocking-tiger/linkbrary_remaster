import { BASE_URL } from './constants/url';
import instance from './instance/default-instance';

export const getUser = async () => {
  try {
    const response = await instance.get(`${BASE_URL}users`);
    return response.data.data[0];
  } catch (e) {
    console.log(e);
  }
};
