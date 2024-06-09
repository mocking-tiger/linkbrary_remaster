import { BASE_URL } from './constants/url';
import { ErrorType } from './types/apiTypes';
import axios from 'axios';
import instance from './instance/default-instance';

export const getLinks = async () => {
  try {
    const response = await instance.get(`${BASE_URL}links`);
    return response.data.data.folder;
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.error.message);
  }
};

export const getLinkForShare = async (folder: number, user: number) => {
  try {
    const resoponse = await axios.get(`${BASE_URL}users/${user}/links?folderId=${folder}`);
    return resoponse;
  } catch (e) {
    console.log(e);
  }
};

export const deleteLink = async (id: number) => {
  try {
    const response = await instance.delete(`${BASE_URL}links/${id}`);
    alert('삭제되었습니다.');
    return response;
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.error.message);
  }
};

export const addLink = async (id: number | undefined, url: string) => {
  try {
    const response = await instance.post(`${BASE_URL}links`, {
      url: url,
      folderId: id,
    });
    alert('추가되었습니다.');
    return response;
  } catch (e) {
    const error = e as ErrorType;
    if (error.response.status === 405) {
      alert('유효하지 않은 URL입니다.');
    } else {
      alert(error.response.data.error.message);
    }
  }
};
