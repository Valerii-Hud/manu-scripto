import express from 'express';
import {
  commentOnPost,
  createPost,
  deleteComment,
  deletePost,
  changePostCounter,
  getLikedPosts,
  getAllPosts,
  getFollowingPosts,
  getUserPosts,
} from '../controllers/post.controller';

const router = express.Router();

router.get('/all', getAllPosts);
router.get('/likes/:userName', getLikedPosts);
router.get('/following', getFollowingPosts);
router.get('/user/:userName', getUserPosts);

router.post('/create', createPost);
router.post('/comment/:postId', commentOnPost);

router.put('/counter/:postId', changePostCounter);

router.delete('/comment/:postId', deleteComment);
router.delete('/:postId', deletePost);

export default router;
