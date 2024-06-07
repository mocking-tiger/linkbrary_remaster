import { BASE_URL } from './constants/url';
import axios from 'axios';
import instance from './instance/default-instance';

export const getUser = async () => {
  try {
    const response = await instance.get(`${BASE_URL}users`);
    return response.data.data[0];
  } catch (e) {
    console.log(e);
  }
};

export const getUserForShare = async (id: number) => {
  try {
    const resoponse = await axios.get(`${BASE_URL}users/${id}`);
    return resoponse;
  } catch (e) {
    console.log(e);
  }
};
