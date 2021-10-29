import express from 'express';
import { createSampleUsers, signin, signup, userDetails } from '../controllers/userController.js';
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

export default userRouter;
