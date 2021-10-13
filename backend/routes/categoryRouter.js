import express from 'express';
import { createSampleCategories } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

// Create sample categories
categoryRouter.get('/seed', createSampleCategories);

export default categoryRouter;
