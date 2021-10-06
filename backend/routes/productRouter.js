import express from 'express';
import { createSampleProducts } from '../controllers/productController.js';

const productRouter = express.Router();

// Create sample products
productRouter.get('/seed', createSampleProducts);

export default productRouter;
