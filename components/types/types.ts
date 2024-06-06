export type UserInfoType = {
  auth_id: string;
  created_at: string;
  email: string;
  id: number;
  image_source: string;
  name: string;
};

export type LinkType = {
  id: number;
  created_at: string;
  updated_at: string | null;
  url: string;
  title: string;
  description: string | null;
  image_source: string | null;
  folder_id: number;
};

export interface FolderDetailType {
  id: number;
  created_at: string;
  name: string;
  user_id: number;
  favorite: boolean;
  link: {
    count: number;
  };
}
