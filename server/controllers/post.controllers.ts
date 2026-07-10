import errorHandler from '../lib/utils/errorHandler.lib';
import type { Request, Response } from 'express';
import type { AuthRequest } from '../types/interfaces.types';
import User from '../models/user.model';
import Post from '../models/post.model';
import { destroyImage, uploadImage } from '../lib/utils/cloudinary.lib';

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { text, tags, postType } = req.body;
    let { image } = req.body;

    if (tags && !Array.isArray(tags))
      return res.status(400).json({ error: 'Invalid Tags Type' });

    const validPostTypes = [
      'public',
      'private',
      'onlySubscribers',
      'onlySponsors',
    ];

    if (postType && !validPostTypes.includes(postType)) {
      return res.status(400).json({ error: 'Invalid Post Type' });
    }

    const userId = req.user?._id.toString();

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!text && !image)
      return res.status(400).json({ error: 'Post must have text or image' });

    if (image) {
      image = await uploadImage(image);
    }

    const newPost = new Post({
      text,
      image,
      tags,
      postType,
      user: userId,
    });

    await newPost.save();

    return res.status(201).json(newPost);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: 'Post Not Found' });

    if (!post.user) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (post.user?._id.toString() !== req.user?._id.toString()) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to delete this post' });
    }

    if (post.image) {
      await destroyImage(post, 'image');
    }

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    errorHandler(res, error);
  }
};
