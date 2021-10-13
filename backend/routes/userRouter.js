import express from 'express';
import { createSampleUsers } from '../controllers/userController.js';

const userRouter = express.Router();

// Create sample users
userRouter.get('/seed', createSampleUsers);

export default userRouter;
