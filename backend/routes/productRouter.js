import express from 'express';
import {
  createSampleProducts,
  listProducts,
  detailsProduct,
  listProductsRelated,
  createProduct,
  updateProduct,
  deleteProduct,
  getListBrandProduct,
  listProductSearch,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/productController.js';
import { isAdmin, isAuth } from '../utils/authMiddleware.js';

const productRouter = express.Router();

// Create sample products
productRouter.get('/seed', createSampleProducts);

// Get list brand
productRouter.get('/brands', getListBrandProduct);

// Get list product search
productRouter.get('/search', listProductSearch);

// create new review
productRouter.post('/reviews/:id', isAuth, createReview);

// Update review
productRouter.put('/reviews/:productId/:reviewId', isAuth, updateReview);

// Delete review
productRouter.delete('/reviews/:productId/:reviewId', isAuth, deleteReview);

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
