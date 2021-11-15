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
    const pageSize = Number(req.query.pageSize) || 8;
    const page = Number(req.query.pageNumber) || 1;

    const category = req.query.category || '';

    var categoryDB;

    if (category) {
      categoryDB = await Category.findOne({ slug: category });
    }

    const categoryFilter =
      category && category !== 'all' ? { categories: { $in: [categoryDB._id.toString()] } } : {};

    const count = await Product.count({
      ...categoryFilter,
    });

    const products = await Product.find({
      ...categoryFilter,
    })
      .populate('categories')
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.send({
      products,
      pageSize,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize),
      totalRows: count,
    });
  } catch (error) {
    res.status(500).send({ message: 'No products found' });
  }
};

export const detailsProduct = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug })
      .populate('categories')
      .populate('reviews.user', 'name avatar');
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

export const getListBrandProduct = async (req, res) => {
  try {
    const brands = await Product.find({}).distinct('brand');
    return res.send(brands);
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const listProductSearch = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 9;
    const page = Number(req.query.pageNumber) || 1;

    const name = req.query.name || '';
    const category = req.query.category || '';
    const brand = req.query.brand || '';
    const order = req.query.order || '';
    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter = category ? { categories: category } : {};
    const brandFilter = brand ? { brand } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };

    const count = await Product.count({
      ...nameFilter,
      ...categoryFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    const products = await Product.find({
      ...nameFilter,
      ...categoryFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate('categories')
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    return res.send({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      pageSize,
      totalRows: count,
    });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const createReview = async (req, res) => {
  try {
    const { rating, subject, description } = req.body;

    if (!rating && !subject && !description) {
      return res.status(401).send({ message: 'Some information is missing' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ message: 'Product Not Found' });
    }

    if (product.reviews.find((x) => String(x.user) === String(req.user._id))) {
      return res.status(400).send({ message: 'You already submitted a review' });
    }

    const review = {
      user: req.user._id,
      rating: Number(rating),
      subject,
      description,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      message: 'Review Created',
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
    });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};
