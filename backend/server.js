import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import categoryRouter from './routes/categoryRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';

dotenv.config();

// App
const app = express();

// Database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTION ERR', err));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// Router
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// Test connect
app.get('/', (req, res) => {
  res.send({ message: 'Server is ready' });
});

// Handle error
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send({ message: err.message });
  }
  next();
});

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
