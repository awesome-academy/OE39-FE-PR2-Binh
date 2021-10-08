import express from 'express';
import {
  createSampleProducts,
  listProducts,
  detailsProduct,
  listProductsRelated,
} from '../controllers/productController.js';

const productRouter = express.Router();

// Create sample products
productRouter.get('/seed', createSampleProducts);

// Get list product
productRouter.get('/', listProducts);

// Get product detail
productRouter.get('/:slug', detailsProduct);

// Get list product related
productRouter.get('/related/:slug', listProductsRelated);

export default productRouter;
