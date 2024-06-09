import { BASE_URL } from './constants/url';
import { ErrorType } from './types/apiTypes';
import axios from 'axios';
import instance from './instance/default-instance';

export const getFolders = async () => {
  const response = await instance.get(`${BASE_URL}folders`);
  return response.data.data.folder;
};

export const getFolderForShare = async (id: number) => {
  try {
    const resoponse = await axios.get(`${BASE_URL}folders/${id}`);
    return resoponse;
  } catch (e) {
    console.log(e);
  }
};

export const getFolderDetail = async (id: number) => {
  try {
    const response = await instance.get(`${BASE_URL}users/${id}/folders`);
    return response.data.data;
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.error.message);
  }
};

export const editFolderName = async (id: number | undefined, title: string) => {
  try {
    const response = await instance.put(`${BASE_URL}folders/${id}`, {
      name: title,
    });
    alert('수정되었습니다.');
    return response;
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.error.message);
  }
};

export const deleteFolder = async (id: number) => {
  try {
    const response = await instance.delete(`${BASE_URL}folders/${id}`);
    alert('삭제되었습니다.');
    return response;
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.error.message);
  }
};

export const addFolder = async (title: string) => {
  try {
    const response = await instance.post(`${BASE_URL}folders`, {
      name: title,
    });
    alert('추가되었습니다.');
    return response;
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.error.message);
  }
};
