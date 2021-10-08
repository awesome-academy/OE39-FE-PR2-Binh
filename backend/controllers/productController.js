import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
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
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const category = req.query.category || '';

    var categoryDB;

    if (category) {
      categoryDB = await Category.findOne({ slug: category });
    }

    const categoryFilter =
      category && category !== 'all' ? { categories: { $in: [categoryDB._id.toString()] } } : {};

    const products = await Product.find({
      ...categoryFilter,
    })
      .populate('categories')
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: 'No products found' });
  }
};
