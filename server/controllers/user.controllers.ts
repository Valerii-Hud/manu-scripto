import type { Request, Response } from 'express';
import errorHandler from '../lib/utils/errorHandler.lib';
import User from '../models/user.model';
import type { AuthRequest } from '../types/interfaces.types';
import Notification from '../models/notification.model';
import bcrypt from 'bcryptjs';
import {
  destroyImage,
  isImageExists,
  uploadImage,
} from '../lib/utils/cloudinary.lib';
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
          isHidden: { $ne: true },
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

// TODO: Rewrite this
export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { email, userName, newPassword, currentPassword, bio, link } =
      req.body;

    let { profileImage, coverImage } = req.body;

    const userId = req.user?._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    if (
      (currentPassword && !newPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(400).json({
        error: 'Please provide both current password and new password',
      });
    }

    if (currentPassword && newPassword) {
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({
          error: 'Current password is incorrect',
        });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({
          error: 'Password must be at least 8 characters long',
        });
      }

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (userName !== undefined && userName.trim() !== '') {
      const trimmedUserName = userName.trim();

      if (trimmedUserName.length < 4) {
        return res.status(400).json({
          error: 'Username must be at least 4 characters long',
        });
      }

      if (trimmedUserName.length > 16) {
        return res.status(400).json({
          error: 'Username must be at most 16 characters long',
        });
      }

      user.userName = trimmedUserName;
    }

    if (email !== undefined && email.trim() !== '') {
      user.email = email.trim();
    }

    if (bio !== undefined) {
      user.bio = bio.trim();
    }

    if (link !== undefined) {
      user.link = link.trim();
    }

    if (profileImage) {
      if (isImageExists(user, 'profileImage')) {
        await destroyImage(user, 'profileImage');
      }

      const uploadedProfileImage = await uploadImage(profileImage);

      user.profileImage = uploadedProfileImage;
    }

    if (coverImage) {
      if (isImageExists(user, 'coverImage')) {
        await destroyImage(user, 'coverImage');
      }

      const uploadedCoverImage = await uploadImage(coverImage);

      user.coverImage = uploadedCoverImage;
    }

    const updatedUser = await user.save();

    updatedUser.password = '';

    return res.status(200).json(updatedUser);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const changeUserType = async (req: AuthRequest, res: Response) => {
  try {
    const { userType } = req.body;
    const validUserTypes = [
      'administrator',
      'moderator',
      'support',
      'secretAdministrator',
    ];
    if (!validUserTypes.includes(userType)) {
      return res.status(401).json({ error: 'Invalid User Type' });
    }

    const currentUserId = req.user?._id;
    if (!currentUserId)
      return res.status(401).json({ error: 'Unauthorized Permissons Deny' });
    const { userId: userToModifyId } = req.params;
    if (!userToModifyId)
      return res.status(404).json({ error: 'User Not Found' });

    const currentUser = await User.findById(currentUserId).select('-password');
    if (!currentUser || !currentUser.userType)
      return res.status(404).json({ error: 'User Not Found' });
    if (currentUser && currentUser.userType === 'administrator') {
      const userToModify = await User.findByIdAndUpdate(
        userToModifyId,
        {
          userType: userType,
        },
        { new: true }
      ).select('-password');
      return res.status(201).json(userToModify);
    } else {
      return res.status(401).json({ error: 'Unauthorized Permissions Deny' });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getMyPoints = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    const user = await User.findById(userId).select('-password');

    if (!user) return res.status(404).json({ error: 'User Not Found' });

    const { points } = user;

    return res.status(200).json(points);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const changePointsByUserId = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, type } = req.body;

    if (type === 'add') {
      if (amount <= 0) {
        return res
          .status(401)
          .json({ error: 'You cannot add zero or minus points' });
      }
    }

    if (type === 'subtract') {
      if (amount >= 0) {
        return res
          .status(401)
          .json({ error: 'You cannot add zero or plus points' });
      }
    }

    const { userId: userToModifyId } = req.params;
    const userToModify = await User.findById(userToModifyId);

    const currentPoints = userToModify?.points;

    const updatedUser = await User.findByIdAndUpdate(
      userToModifyId,
      {
        points:
          type === 'add'
            ? Number(currentPoints) + Number(amount)
            : type === 'subtract'
              ? Number(currentPoints) - Number(amount)
              : amount,
      },
      { new: true }
    );

    return res.status(201).json(updatedUser);
  } catch (error) {
    errorHandler(res, error);
  }
};

export type UserTogglerFlags = 'isHidden' | 'isVerified';
// TODO: Test it
export const toggleUserFlags = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.user?._id;

    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ error: 'Please provide toggler type' });
    }

    const currentUser = await User.findById(currentUserId);

    if (!currentUser)
      return res
        .status(401)
        .json({ error: 'Unauthorized UserId must be provided' });

    const { userId: userToModifyId } = req.params;

    const userToModify =
      await User.findById(userToModifyId).select('-password');

    if (!userToModify) return res.status(404).json({ error: 'User Not Found' });

    const response = await User.findByIdAndUpdate(
      userToModify._id,
      {
        [type]: !userToModify[type as UserTogglerFlags],
      },
      { new: true }
    );

    return res.status(200).json(response);
  } catch (error) {
    errorHandler(res, error);
  }
};
