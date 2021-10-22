import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import data from '../data.js';
import slugify from '../utils/slugify.js';

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

export const detailsProduct = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug }).populate('categories');
    if (!product) {
      res.status(404).send({ message: 'No product found' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: 'No product found' });
  }
};

export const listProductsRelated = async (req, res) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const slug = req.params.slug;
    const product = await Product.findOne({ slug });

    if (product) {
      const categories = product.categories.map((category) => category._id);
      const related = await Product.find({
        _id: { $ne: product._id },
        categories: { $in: [...categories] },
      })
        .populate('categories')
        .skip(pageSize * (page - 1))
        .limit(pageSize);

      res.send(related);
    } else {
      res.status(404).send({ message: 'No products found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'No products found' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, brand, price, salePrice } = req.body;

    if (name) {
      req.body.slug = slugify(name);
    } else {
      return res.status(401).send({ message: 'Name is require' });
    }

    if (!description || !brand || !price) {
      return res.status(401).send({ message: 'Some information is missing' });
    }

    if (price && salePrice) {
      if (salePrice >= price) {
        return res.status(401).send({ message: 'Sale price greater than origin price' });
      }
    }

    const newProduct = await new Product(req.body).save();
    return res.json(newProduct);
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, brand, price, salePrice, images, countInStock } = req.body;

    if (name) {
      req.body.slug = slugify(name);
    } else {
      return res.status(401).send({ message: 'Name is require' });
    }

    if (!description || !brand || !price || !images || !countInStock) {
      return res.status(401).send({ message: 'Some information is missing' });
    }

    if (price && salePrice) {
      if (salePrice >= price) {
        return res.status(401).send({ message: 'Sale price greater than origin price' });
      }
    }

    const updated = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
    }).exec();

    return res.json(updated);
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).send({ message: 'Product Not Found' });
    }

    const deleteProduct = await product.remove();
    return res.send(deleteProduct);
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};
