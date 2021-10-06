import User from '../models/userModel.js';
import data from '../data.js';

export const createSampleUsers = async (req, res) => {
  try {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  } catch (error) {
    res.status(500).send({ message: 'Import Users Failed' });
  }
};
