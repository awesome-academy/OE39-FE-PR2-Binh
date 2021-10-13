import express from 'express';
import { createSampleUsers } from '../controllers/userController.js';

const userRouter = express.Router();

// Create sample users
userRouter.get('/seed', createSampleUsers);

// Signup user
userRouter.post('/signup', signup);

// Signin user
userRouter.post('/signin', signin);

export default userRouter;
