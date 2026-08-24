import type { Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../lib/utils/generateToken.lib';
import errorHandler from '../lib/utils/errorHandler.lib';
import { ENV_VARS } from '../lib/env/envVars.lib';
import type { AuthRequest } from '../types/interfaces.types';
import userRepository from '../repositories/user.repository';
import passwordHelper from '../lib/utils/passwordHelper.lib';
export const signup = async (req: AuthRequest, res: Response) => {
  try {
    const { email, userName, password, confirmPassword } = req.body;

    if (!email || !userName || !password || !confirmPassword) {
      return res.status(403).json({ error: 'Please provide all fields' });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 8 characters long' });
    }

    if (userName.length < 4 || userName.length > 16) {
      return res.status(400).json({
        error:
          'Username must be at least 4 characters long and no more than 16',
      });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: 'Password confirmation does not match' });
    }

    const isUserExistsByUserName = await userRepository.findUser({
      searchString: userName,
      searchBy: 'userName',
    });

    if (isUserExistsByUserName) {
      return res.status(400).json({ error: 'This username is already taken' });
    }

    const isUserExistsByEmail = await userRepository.findUser({
      searchString: userName,
      searchBy: 'userName',
    });

    if (isUserExistsByEmail) {
      return res.status(400).json({ error: 'This email is already taken' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      userName,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImage: newUser.profileImage,
        coverImage: newUser.coverImage,
        bio: newUser.bio,
        link: newUser.link,
      });
    } else {
      return res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(403).json({ error: 'Please provide all fields' });
    }

    const user = await userRepository.findUser({
      searchBy: 'userName',
      searchString: userName,
    });

    console.log(`user ${user}`);

    if (
      !user ||
      !user.password ||
      !passwordHelper.isPasswordCorrect(password, user.password)
    ) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImage: user.profileImage,
      coverImage: user.coverImage,
      bio: user.bio,
      link: user.link,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const logout = (_req: AuthRequest, res: Response) => {
  const { NODE_ENV } = ENV_VARS;
  try {
    res.clearCookie('secret_token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: NODE_ENV === 'production',
    });
    return res.status(200).json({ message: 'Logout successfully' });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const checkAuth = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (userId) {
      const user = await userRepository.findUserById({ userId: userId });
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: 'UserId not provided' });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
