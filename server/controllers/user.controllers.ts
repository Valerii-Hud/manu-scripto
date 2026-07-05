import type { Request, Response } from 'express';
import errorHandler from '../lib/utils/errorHandler.lib';
import User from '../models/user.model';
import type { AuthRequest } from '../types/interfaces.types';
import Notification from '../models/notification.model';
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { userName } = req.params;

    const user = await User.findOne({ userName: userName }).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getSuggestedUsers = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    const usersFollowedByMe = await User.findById(userId).select('following');

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $sample: { size: 10 } },
    ]);

    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe?.following.includes(user._id)
    );

    const suggestedUsersWithPasswords = filteredUsers.slice(0, 4);

    suggestedUsersWithPasswords.map((user) => (user.password = null));

    return res.status(200).json(suggestedUsersWithPasswords);
  } catch (error) {
    errorHandler(res, error);
  }
};
export const followUnfollowUser = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    if (userId === req.user?._id.toString())
      return res
        .status(400)
        .json({ error: 'You cannot follow/unfollow yourself' });

    const currentUser = await User.findById(req.user?._id);
    const modifyUser = await User.findById(userId);

    if (!currentUser || !modifyUser)
      return res.status(404).json({ error: 'User not found' });

    if (typeof userId !== 'string') {
      return res.status(401).json({ error: 'User not found' });
    }

    const isFollowing = currentUser.following.some((id) => id.equals(userId));

    if (isFollowing) {
      await User.findByIdAndUpdate(userId, {
        $pull: { followers: req.user?._id },
      });
      await User.findByIdAndUpdate(req.user?._id, {
        $pull: { following: userId },
      });
      return res.status(200).json({ message: 'User unfollowed successfully' });
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: { followers: req.user?._id },
      });
      await User.findByIdAndUpdate(req.user?._id, {
        $push: { following: userId },
      });
      const newNotification = new Notification({
        from: req.user?._id,
        to: userId,
        type: 'follow',
      });
      await newNotification.save();

      return res.status(200).json({ message: 'User followed successfully' });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
export const updateUserProfile = (req: Request, res: Response) => {};
