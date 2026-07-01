import type { Request } from 'express';
import type { ObjectId } from 'mongoose';
import type mongoose from 'mongoose';
export interface EnvVars {
  PROTOCOL: string;
  DOMAIN: string;
  PORT: number;
  JWT_SECRET: string;
  NODE_ENV: string;
  MONGO_URI: string;
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

export interface AuthRequest extends Request {
  user?: User;
}
