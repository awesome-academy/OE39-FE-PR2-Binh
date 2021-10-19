import Category from '../models/categoryModel.js';
import data from '../data.js';
import slugify from '../utils/slugify.js';

const buildAncestors = async (id, parent_id) => {
  let ancest = [];
  try {
    let parent_category = await Category.findOne(
      { _id: parent_id },
      { name: 1, slug: 1, ancestors: 1 }
    ).exec();
    if (parent_category) {
      const { _id, name, slug } = parent_category;
      const ancest = [...parent_category.ancestors];
      ancest.unshift({ _id, name, slug });
      const category = await Category.findByIdAndUpdate(id, { $set: { ancestors: ancest } });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const buildHierarchyAncestors = async (category_id, parent_id) => {
  if (category_id && parent_id) {
    buildAncestors(category_id, parent_id);
  }
  const result = await Category.find({ parent: category_id }).exec();
  if (result.length > 0) {
    result.forEach((doc) => {
      buildHierarchyAncestors(doc._id, category_id);
    });
  }
};

export const createSampleCategories = async (req, res) => {
  try {
    await Category.remove({});
    const createdCategories = await Category.insertMany(data.categories);
    return res.send({ createdCategories });
  } catch (error) {
    return res.status(500).send({ message: 'Import Categories Failed' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, parent = null } = req.body;
    const category = new Category({
      name: req.body.name,
      slug: slugify(req.body.name),
      description: req.body.description,
      parent,
    });

    let newCategory = await category.save();
    buildAncestors(newCategory._id, parent);
    return res.status(201).send({ message: 'Category created' });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).exec();
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    return res.send(category);
  } catch (error) {
    res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Category.count({});

    const categories = await Category.find({})
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    return res.send({
      categories,
      pageSize,
      page,
      pages: Math.ceil(count / pageSize),
      totalRows: count,
    });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const UpdateCategory = async (req, res) => {
  try {
    const { name, description, parent = null } = req.body;
    const category = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: { name, slug: slugify(name), description, parent } }
    );
    await Category.updateMany(
      { 'ancestors._id': category._id },
      {
        $set: { 'ancestors.$.name': name, 'ancestors.$.slug': slugify(name) },
      },
      { multi: true }
    );
    if (parent !== null) {
      await buildHierarchyAncestors(category._id, parent);
    }
    return res.status(200).send({ message: 'Updated category success' });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    if (deleted) {
      await Category.deleteMany({
        'ancestors._id': deleted._id,
      });
    }
    return res.send(deleted);
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};
