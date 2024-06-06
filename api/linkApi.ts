import { BASE_URL } from './constants/url';
import instance from './instance/default-instance';
import { ErrorType } from './types/apiTypes';

export const getLinks = async () => {
  try {
    const response = await instance.get(`${BASE_URL}links`);
    return response.data.data.folder;
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.error.message);
  }
};

export const deleteLink = async (id: number) => {
  try {
    const response = await instance.delete(`${BASE_URL}links/${id}`);
    console.log(response);
    alert('삭제되었습니다.');
    return response;
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.error.message);
  }
};
