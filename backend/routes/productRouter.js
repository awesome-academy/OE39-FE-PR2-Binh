import express from 'express';
import {
  createSampleProducts,
  listProducts,
  detailsProduct,
  listProductsRelated,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { isAdmin, isAuth } from '../utils/authMiddleware.js';

const productRouter = express.Router();

// Create sample products
productRouter.get('/seed', createSampleProducts);

// Get list product
productRouter.get('/', listProducts);

// Get product detail
productRouter.get('/:slug', detailsProduct);

// Add new product
productRouter.post('/', isAuth, isAdmin, createProduct);

// Update category
productRouter.put('/:slug', isAuth, isAdmin, updateProduct);

// Delete category
productRouter.delete('/:slug', isAuth, isAdmin, deleteProduct);

// Get list product related
productRouter.get('/related/:slug', listProductsRelated);

export default productRouter;
