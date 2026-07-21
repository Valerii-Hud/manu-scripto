import errorHandler from "../lib/utils/errorHandler.lib";
import type { Response } from "express";
import type { AuthRequest } from "../types/interfaces.types";
import User from "../models/user.model";
import Post from "../models/post.model";
import { destroyImage, uploadImage } from "../lib/utils/cloudinary.lib";
import Notification from "../models/notification.model";
import type { Id } from "../types/interfaces.types";

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { text, tags, postType } = req.body;
    let { image } = req.body;

    if (tags && !Array.isArray(tags))
      return res.status(400).json({ error: "Invalid Tags Type" });

    const validPostTypes = [
      "public",
      "private",
      "onlySubscribers",
      "onlySponsors",
    ];

    if (postType && !validPostTypes.includes(postType)) {
      return res.status(400).json({ error: "Invalid Post Type" });
    }

    const userId = req.user?._id.toString();

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!text && !image)
      return res.status(400).json({ error: "Post must have text or image" });

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

    if (!post) return res.status(404).json({ error: "Post Not Found" });

    if (!post.user) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (post.user?._id.toString() !== req.user?._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this post" });
    }

    if (post.image) {
      await destroyImage(post, "image");
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const commentOnPost = async (req: AuthRequest, res: Response) => {
  try {
    const { text, isHidden } = req.body;
    const { postId } = req.params;
    const userId = req.user?._id.toString();

    if (!text) return res.status(400).json({ error: "Text field is required" });

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post Not Found" });

    const newComment = { text, isHidden, user: userId };

    post.comments.push(newComment);

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  try {
    const { commentId } = req.body;
    const { postId } = req.params;
    const userId = req.user?._id.toString();

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post Not Found" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User Not Found" });

    if (userId !== post.user?._id.toString() && user.userType !== "default") {
      post.comments.filter((comment) => comment._id !== commentId);
    }
    if (userId !== post.user?._id.toString() && user.userType === "default") {
      return res.status(401).json({ error: "You can not delete this comment" });
    }

    const comment = post.comments.id(commentId);

    if (!comment) return res.status(404).json({ error: "Comment Not Found" });

    await comment.deleteOne();
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const changePostCounter = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { postId } = req.params;

    const { type } = req.body;

    const validTypes = ["like", "dislike", "save"] as const;

    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid Type" });
    }

    const postCounter = `${type}s`;
    const userCounter = `${type}dPosts`;

    const post = await Post.findById(postId);
    if (!userId) return res.status(404).json({ error: "User Not Found" });
    if (!post) return res.status(404).json({ error: "Post Not Found" });

    const pCounter = post[postCounter as keyof typeof post] as Id[];
    const isChanged = pCounter.includes(userId);

    if (isChanged) {
      await Post.updateOne(
        { _id: postId },
        { $pull: { [postCounter]: userId } },
      );
      await User.updateOne(
        { _id: userId },
        { $pull: { [userCounter]: postId } },
      );
      return res.status(200).json({ message: "Post unchanged successfully" });
    } else {
      pCounter.push(userId);
      await User.updateOne(
        { _id: userId },
        { $push: { [userCounter]: postId } },
      );
      await post.save();
      if (type === "like") {
        const newNotification = new Notification({
          from: userId,
          to: post.user,
          type: type,
        });
        await newNotification.save();
      }
      return res.status(200).json({ message: "Post changed successfully" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getAllPosts = async (_req: AuthRequest, res: Response) => {
  try {
    const posts = await Post.find()
      .sort({ createtAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    if (posts.length === 0) return res.status(200).json([]);

    return res.status(200).json(posts);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getLikedPosts = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.status(404).json({ error: "User Not Found" });

    const user = await User.findById(userId).select("-password");

    const likedPosts = await Post.find({ _id: { $in: user?.likedPosts } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    return res.status(200).json(likedPosts);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getFollowingPosts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User Not Found" });

    const { following } = user;
    const feedPosts = await Post.find({ user: { $in: following } })
      .sort({ createtAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    return res.status(200).json(feedPosts);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getUserPosts = async (req: AuthRequest, res: Response) => {
  try {
    const { userName } = req.params;

    const user = await User.findOne({ userName: userName });

    if (!user) return res.status(404).json({ error: "User Not Found" });

    const posts = await Post.find({ user: user?._id })
      .sort({ createtAt: -1 })
      .populate({ path: "user", select: "-password" })
      .populate({ path: "comments.user", select: "-password" });

    return res.status(200).json(posts);
  } catch (error) {
    errorHandler(res, error);
  }
};
