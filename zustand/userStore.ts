import { create } from 'zustand';
import { UserInfoType } from '../components/types/types';

interface UserState {
  userInfo: UserInfoType | null;
  setUserInfo: (userInfo: UserInfoType) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: UserInfoType) => set(() => ({ userInfo })),
}));
