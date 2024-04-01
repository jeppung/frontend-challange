export interface IPost {
  id: number;
  user_id: number;
  title: string;
  body: string;
}
export interface IComment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface ICreateUserRequest {
  name: string;
  gender: string;
  email: string;
  status: string;
}
