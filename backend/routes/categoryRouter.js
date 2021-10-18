import express from 'express';
import {
  createCategory,
  createSampleCategories,
  deleteCategory,
  getAllCategories,
  getCategoryBySlug,
  UpdateCategory,
} from '../controllers/categoryController.js';
import { isAdmin, isAuth } from '../utils/authMiddleware.js';

const categoryRouter = express.Router();

// Create sample categories
categoryRouter.get('/seed', createSampleCategories);

// Add new category
categoryRouter.post('/', isAuth, isAdmin, createCategory);

// Get category by slug
categoryRouter.get('/:slug', getCategoryBySlug);

// Get all category
categoryRouter.get('/', getAllCategories);

// Update category
categoryRouter.put('/:slug', isAuth, isAdmin, UpdateCategory);

// Delete category
categoryRouter.delete('/:slug', isAuth, isAdmin, deleteCategory);

export default categoryRouter;
