import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { payOrderEmailTemplate, transporter } from '../utils/sendGrid.js';

export const createOrder = async (req, res) => {
  try {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      return res.status(201).send({ message: 'New Order Created', order: createdOrder });
    }
  } catch (error) {
    res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const detailsOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'Order Not Found' });
    }

    if (order.user.toString() !== req.user._id) {
      if (req.user.isAdmin) {
        return res.send(order);
      } else {
        return res.status(401).send({ message: 'Unauthorized' });
      }
    }

    return res.send(order);
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const paymentOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'email name');

    if (!order) {
      return res.status(404).send({ message: 'Order Not Found' });
    }

    if (order.isPaid) {
      return res.status(401).send({ message: 'Order Paid Before' });
    }

    const paymentHander = async () => {
      order.isPaid = true;
      order.paidAt = Date.now();
      if (req.body.email_address) {
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        };
      }
      const updatedOrder = await order.save();

      const mailOptions = {
        to: order.user.email,
        from: 'anhbinh2499@gmail.com',
        subject: `New order ${order._id}`,
        html: payOrderEmailTemplate(order),
      };

      transporter.sendMail(mailOptions, (err, info) => err && console.log(err));

      return res.send({ message: 'Order Paid', order: updatedOrder });
    };

    if (order.user.toString() !== req.user._id) {
      if (req.user.isAdmin) {
        return await paymentHander();
      } else {
        return res.status(401).send({ message: 'Unauthorized' });
      }
    }

    return await paymentHander();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const deliverOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send({ message: 'Order Not Found' });
    }

    if (order.isDelivered) {
      return res.status(401).send({ message: 'Order Delivered Before' });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();

    return res.send({ message: 'Order Delivered', order: updatedOrder });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const listOrderMine = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    return res.send(orders);
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const getListOrders = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Order.count({});

    const orders = await Order.find({})
      .populate('user', 'name')
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.send({
      orders,
      pageSize,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize),
      totalRows: count,
    });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'Order Not Found' });
    }
    const deleteOrder = await order.remove();
    return res.send({ message: 'Order Deleted', order: deleteOrder });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const summaryOrder = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);

    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);

    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          value: '$orders',
          category: 'Orders',
        },
      },
    ]);

    const dailySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          sales: { $sum: '$totalPrice' },
        },
      },
      {
        $project: {
          _id: 1,
          value: '$sales',
          category: 'Sales',
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const productBrands = await Product.aggregate([
      {
        $group: {
          _id: '$brand',
          count: { $sum: 1 },
        },
      },
    ]);

    const productCategories = await Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $project: {
          category: 1,
        },
      },
      {
        $unwind: '$category',
      },
      {
        $group: {
          _id: '$category.name',
          count: { $sum: 1 },
        },
      },
    ]);

    res.send({
      users,
      orders,
      summaryOrders: [...dailyOrders, ...dailySales],
      productBrands,
      productCategories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};
