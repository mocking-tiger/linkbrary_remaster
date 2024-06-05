import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserInfoType } from '../components/types/types';

interface UserState {
  userInfo: UserInfoType;
  setUserInfo: (userInfo: UserInfoType) => void;
  clearUserInfo: () => void;
}

const initialState = {
  auth_id: '',
  created_at: '',
  email: '',
  id: 0,
  image_source: '',
  name: '',
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userInfo: {
        ...initialState,
      },
      setUserInfo: (userInfo: UserInfoType) => {
        set(() => ({ userInfo }));
      },
      clearUserInfo: () => set({ userInfo: { ...initialState } }),
    }),
    { name: 'userInfo' },
  ),
);
