import { BASE_URL } from './constants/url';
import instance from './instance/default-instance';
import { ErrorType } from './types/apiTypes';

export const getFolders = async () => {
  const response = await instance.get(`${BASE_URL}folders`);
  return response.data.data.folder;
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
    console.log(response);
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
    console.log(response);
    return response;
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.error.message);
  }
};
