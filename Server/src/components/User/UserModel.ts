export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
}
export interface UserPostModel {
  name: string;
  email: string;
  password: string;
}
export interface UserPutModel {
  name: string;
  email: string;
  updatedAt: Date;
}
