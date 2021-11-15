import express from 'express';
import {
  createOrder,
  detailsOrder,
  paymentOrder,
  deliverOrder,
  listOrderMine,
  getListOrders,
  deleteOrder,
  summaryOrder,
} from '../controllers/orderController.js';
import { isAuth, isAdmin } from '../utils/authMiddleware.js';

const orderRouter = express.Router();

// Get my order
orderRouter.get('/mine', isAuth, listOrderMine);

// Summary order
orderRouter.get('/summary', isAuth, isAdmin, summaryOrder);

// Create new order
orderRouter.post('/', isAuth, createOrder);

// Get order detail
orderRouter.get('/:id', isAuth, detailsOrder);

// update order payment
orderRouter.put('/pay/:id', isAuth, paymentOrder);

// update order delivered
orderRouter.put('/deliver/:id', isAuth, isAdmin, deliverOrder);

// Get list order
orderRouter.get('/', isAuth, isAdmin, getListOrders);

// Delete order
orderRouter.delete('/:id', isAuth, isAdmin, deleteOrder);

export default orderRouter;
