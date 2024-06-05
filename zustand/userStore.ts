import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserInfoType } from '../components/types/types';

export const useUserStore = create(
  persist(
    (set) => ({
      userInfo: {},
      setUserInfo: (userInfo: UserInfoType) => {
        set(() => ({ userInfo }));
      },
      clearUserInfo: () => set({ userInfo: {} }),
    }),
    { name: 'userInfo' },
  ),
);
