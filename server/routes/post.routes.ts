import express from "express";
import {
  commentOnPost,
  createPost,
  deleteComment,
  deletePost,
  likeUnlikePost,
  getLikedPosts,
  getAllPosts,
  getFollowingPosts,
  getUserPosts,
} from "../controllers/post.controllers";

const router = express.Router();

router.get("/all", getAllPosts);
router.get("/likes/:userId", getLikedPosts);
router.get("/following", getFollowingPosts);
router.get("/user/:userName", getUserPosts);

router.post("/create", createPost);
router.post("/like/:postId", likeUnlikePost);
router.post("/comment/:postId", commentOnPost);

router.delete("/comment/:postId", deleteComment);
router.delete("/:postId", deletePost);

export default router;
