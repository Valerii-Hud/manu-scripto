export interface IPost {
  _id: string;
  user: IUser;
  text: string;
  image?: string;
  views?: number;
  likes?: Id[];
  comments: IPostComment[];
  tags?: string[];
  postType?: ['public', 'private', 'onlySubscribers', 'onlySponsors'];
}

export interface IPostComment {
  text: string;
  _id: Id;
  user: IUser;
}

export type Id = string;

export interface IUser {
  _id: Id;
  userName: string;
  fullName?: string | null;
  phoneNumber?: string;
  email?: string;
  followers?: string[];
  following?: string[];
  profileImage?: string;
  coverImage?: string;
  bio?: string;
  link?: string;
}
