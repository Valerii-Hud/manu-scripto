import express from 'express';
import adminOnlyRoute from '../middlewares/adminOnlyRoute.middleware';

import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUser,
  changeUserType,
  getMyPoints,
  changePointsByUserId,
  toggleUserFlags,
} from '../controllers/user.controller';

const router = express.Router();

router.get('/profile/:userName', getUserProfile);
router.get('/suggested', getSuggestedUsers);
router.get('/points', getMyPoints);

router.post('/follow/:userId', followUnfollowUser);

router.put('/points/:userId', adminOnlyRoute, changePointsByUserId);
router.put('/update', updateUser);
router.put('/type/:userId', adminOnlyRoute, changeUserType);
router.put('/toggle/:userId', adminOnlyRoute, toggleUserFlags);
export default router;
