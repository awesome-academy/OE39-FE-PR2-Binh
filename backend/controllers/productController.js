import Product from '../models/productModel.js';
import data from '../data.js';

export const createSampleProducts = async (req, res) => {
  try {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  } catch (error) {
    res.status(500).send({ message: 'Import Products Failed' });
  }
};

export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('categories');
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: 'No products found' });
  }
};
