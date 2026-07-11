import express from 'express';
import protectRoute from '../middlewares/protectRoute.middleware';
import {
  commentOnPost,
  createPost,
  deleteComment,
  deletePost,
} from '../controllers/post.controllers';

const router = express.Router();

router.post('/create', createPost);
// router.post('/like/:postId', likeUnlikePost);
router.post('/comment/:postId', commentOnPost);
router.delete('/comment/:postId', deleteComment);
router.delete('/:postId', deletePost);

export default router;
