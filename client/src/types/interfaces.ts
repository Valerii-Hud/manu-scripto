export interface MongoDbBase {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface IPost extends MongoDbBase {
  user: IUser;
  text: string;
  image?: string;
  views?: number;
  likes?: string[];
  comments: IPostComment[];
  tags?: string[];
}

export interface IPostComment extends MongoDbBase {
  text: string;
  user: IUser;
}

export interface INotification extends MongoDbBase {
  from: IUser;
  to: IUser;
  type: string;
  isRead: boolean;
}

export interface UserBaseData {
  userName: string;
  email?: string;
  profileImage?: string;
  coverImage?: string;
  bio?: string;
  link?: string;
}
export interface IUser extends MongoDbBase, UserBaseData {
  followers?: string[];
  following?: string[];
  likedPosts: string[];
  isHidden?: boolean;
}

export interface IProfileUpdateData extends UserBaseData {
  newPassword?: string;
  currentPassword?: string;
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}
export interface ISearchData {
  searchString: string;
}

export interface AuthDataBase {
  userName: string;
  password: string;
}
export interface ISignupData extends AuthDataBase {
  email: string;
}

export interface ICreatePostData {
  image?: string;
  text?: string;
  isHidden?: boolean;
}

export interface IPostCounterTypeData {
  type: string;
}

export interface IPostCommentData {
  isHidden: boolean;
  text: string;
}

export type ApiData =
  | ISignupData
  | AuthDataBase
  | ICreatePostData
  | IPostCounterTypeData
  | IProfileUpdateData
  | ISearchData
  | IPostCommentData;

type StaticEndpoint =
  | '/api/v1/auth/signup'
  | '/api/v1/auth/login'
  | '/api/v1/auth/logout'
  | '/api/v1/auth/check'
  | '/api/v1/search';

type DynamicEndpoint =
  | `/api/v1/users/${string}`
  | `/api/v1/verify/${string}`
  | `/api/v1/reports/${string}`
  | `/api/v1/posts/${string}`
  | `/api/v1/notifications/${string}`;

export type Endpoint = StaticEndpoint | DynamicEndpoint;
export interface Api {
  endpoint: Endpoint;
  method?: HttpMethod;
  data?: ApiData;
  successMessage?: string;
  errorMessage?: string;
  showError?: boolean;
}
