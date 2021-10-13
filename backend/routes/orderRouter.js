import express from 'express';
import {
  createOrder,
  detailsOrder,
  paymentOrder,
  deliverOrder,
} from '../controllers/orderController.js';
import { isAuth, isAdmin } from '../utils/authMiddleware.js';

const orderRouter = express.Router();

// Create new order
orderRouter.post('/', isAuth, createOrder);

// Get order detail
orderRouter.get('/:id', isAuth, detailsOrder);

// update order payment
orderRouter.put('/pay/:id', isAuth, paymentOrder);

// update order delivered
orderRouter.put('/deliver/:id', isAuth, isAdmin, deliverOrder);

export default orderRouter;
