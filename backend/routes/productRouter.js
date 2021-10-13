import express from 'express';
import { createSampleProducts, listProducts } from '../controllers/productController.js';

const productRouter = express.Router();

// Create sample products
productRouter.get('/seed', createSampleProducts);

// Get list product
productRouter.get('/', listProducts);

export default productRouter;
