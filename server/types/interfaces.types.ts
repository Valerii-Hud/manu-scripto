import type { Request } from "express";
import type { ObjectId } from "mongoose";
import type mongoose from "mongoose";
export interface EnvVars {
  PROTOCOL: string;
  DOMAIN: string;
  PORT: number;
  JWT_SECRET: string;
  NODE_ENV: string;
  MONGO_URI: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
}

export interface User {
  _id: mongoose.Types.ObjectId;
  userName: string;
  fullName?: string | null;
  phoneNumber: string;
  email: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  profileImage: string;
  coverImage: string;
  bio: string;
  link: string;
}

export interface Post {
  _id: mongoose.Types.ObjectId;
  user: User;
  text: string;
  image: string;
  views: number;
  comments: PostComment[];
  tags: string[];
  postType: ["public", "private", "onlySubscribers", "onlySponsors"];
}

export interface PostComment {
  text: string;
  user: User;
}

export type Id = mongoose.Types.ObjectId;

export interface AuthRequest extends Request {
  user?: User;
}
