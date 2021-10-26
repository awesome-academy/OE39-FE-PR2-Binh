import express from 'express';
import {
  createSampleUsers,
  signin,
  signup,
  userDetails,
  updateUserProfile,
  listUsers,
  deleteUser,
  updateUser,
  forgotPassword,
  resetPassword,
} from '../controllers/userController.js';
import { isAdmin, isAuth } from '../utils/authMiddleware.js';

const userRouter = express.Router();

// Create sample users
userRouter.get('/seed', createSampleUsers);

// Forgot password
userRouter.post('/forgot', forgotPassword);

// Reset password
userRouter.post('/reset', resetPassword);

// Signup user
userRouter.post('/signup', signup);

// Signin user
userRouter.post('/signin', signin);

// Get user info
userRouter.get('/:userId', isAuth, userDetails);

// Update user profile
userRouter.put('/profile', isAuth, updateUserProfile);

// Get list user
userRouter.get('/', isAuth, isAdmin, listUsers);

// Delete order
userRouter.delete('/:id', isAuth, isAdmin, deleteUser);

// Update order
userRouter.put('/:id', isAuth, isAdmin, updateUser);

export default userRouter;
