import errorHandler from '../lib/utils/errorHandler.lib';
import Post from '../models/post.model';
import User from '../models/user.model';
import type { AuthRequest } from '../types/interfaces.types';
import type { Response } from 'express';

export const search = async (req: AuthRequest, res: Response) => {
  try {
    const { searchString } = req.body;
    const users = await User.find({
      userName: { $regex: searchString },
      isHidden: { $ne: true },
    }).select('-password -points');

    const posts = await Post.find({
      text: { $regex: searchString },
      isHidden: { $ne: true },
    });

    if (users.length === 0 && posts.length === 0) {
      return res.status(404).json({ error: 'Nothing were found' });
    }

    return res.status(200).json({ users, posts });
  } catch (error) {
    errorHandler(res, error);
  }
};
