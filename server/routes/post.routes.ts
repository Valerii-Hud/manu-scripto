import express from 'express';
import protectRoute from '../middlewares/protectRoute.middleware';
import {
  commentOnPost,
  createPost,
  deleteComment,
  deletePost,
  likeUnlikePost,
  getLikedPosts,
  getAllPosts,
  getFollowingPosts
} from '../controllers/post.controllers';

const router = express.Router();

router.get('/all', getAllPosts);
router.get('/likes/:userId', getLikedPosts);
router.get('/following', getFollowingPosts);

router.post('/create', createPost);
router.post('/like/:postId', likeUnlikePost);
router.post('/comment/:postId', commentOnPost);

router.delete('/comment/:postId', deleteComment);
router.delete('/:postId', deletePost);

export default router;
