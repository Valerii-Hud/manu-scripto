import express from 'express';
import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUserProfile,
} from '../controllers/user.controllers';

const router = express.Router();

router.get('/profile/:userName', getUserProfile);
router.get('/suggested', getSuggestedUsers);
router.post('/follow/:userId', followUnfollowUser);
router.post('/update', updateUserProfile);

export default router;
