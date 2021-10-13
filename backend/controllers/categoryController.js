import Category from '../models/categoryModel.js';
import data from '../data.js';

export const createSampleCategories = async (req, res) => {
  try {
    await Category.remove({});
    const createdCategories = await Category.insertMany(data.categories);
    res.send({ createdCategories });
  } catch (error) {
    res.status(500).send({ message: 'Import Categories Failed' });
  }
};
