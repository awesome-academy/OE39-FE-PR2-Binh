import express from 'express';
import {
  createSampleUsers,
  signin,
  signup,
  userDetails,
  updateUserProfile,
} from '../controllers/userController.js';
import { isAuth } from '../utils/authMiddleware.js';

const userRouter = express.Router();

// Create sample users
userRouter.get('/seed', createSampleUsers);

// Signup user
userRouter.post('/signup', signup);

// Signin user
userRouter.post('/signin', signin);

// Get user info
userRouter.get('/:userId', isAuth, userDetails);

// Update user profile
userRouter.put('/profile', isAuth, updateUserProfile);

export default userRouter;
