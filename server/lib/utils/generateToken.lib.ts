import jwt from 'jsonwebtoken';
import type { Response } from 'express';
import { ENV_VARS } from '../env/envVars.lib';
import type mongoose from 'mongoose';
import errorHandler from './errorHandler.lib';

const generateTokenAndSetCookie = (
  userId: mongoose.Types.ObjectId,
  res: Response
) => {
  try {
    const { JWT_SECRET, NODE_ENV } = ENV_VARS;

    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: '15d',
    });

    res.cookie('secret_token', token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: NODE_ENV === 'production',
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default generateTokenAndSetCookie;
