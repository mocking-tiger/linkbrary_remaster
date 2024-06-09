import { BASE_URL } from './constants/url';
import { ErrorType } from './types/apiTypes';
import instance from './instance/default-instance';

export const signIn = async (email: string, password: string) => {
  try {
    const response = await instance.post(`${BASE_URL}sign-in`, {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);

      return response;
    }
  } catch (e) {
    const error = e as ErrorType;
    if (error.response.status === 400) {
      return alert('입력정보를 다시 확인해 주세요.');
    } else {
      return alert(error.response.data.error.message);
    }
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const response = await instance.post(`${BASE_URL}sign-up`, {
      email: email,
      password: password,
    });
    return response;
  } catch (e) {
    const error = e as ErrorType;
    return alert(error.response.data.error.message);
  }
};
