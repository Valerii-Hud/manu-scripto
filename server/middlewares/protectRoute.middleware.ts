import type { Request, Response, NextFunction } from 'express';
import errorHandler from '../lib/utils/errorHandler.lib';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { ENV_VARS } from '../lib/env/envVars.lib';
import User from '../models/user.model';
import type { AuthRequest } from '../types/interfaces.types';

export default async function protectRoute(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { JWT_SECRET } = ENV_VARS;
    const token = req.cookies.secret_token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No Token Provided' });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Token' });
    }

    const user = await User.findById(decodedToken.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();

    return;
  } catch (error) {
    errorHandler(res, error);
  }
}
