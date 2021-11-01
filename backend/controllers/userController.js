import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail.js';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils/authMiddleware.js';

export const createSampleUsers = async (req, res) => {
  try {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    return res.send({ createdUsers });
  } catch (error) {
    res.status(500).send({ message: 'Import Users Failed' });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, isAdmin = false } = req.body;

    if (!isEmail(email)) return res.status(401).send({ message: 'Invalid Email' });

    if (password.length < 6) {
      return res.status(401).send({ message: 'Password must be atleast 6 characters' });
    }

    const isUser = await User.findOne({ email: email.toLowerCase() });

    if (isUser) {
      return res.status(401).send({ message: 'User already registered' });
    }

    const user = new User({
      name: name,
      email: email.toLowerCase(),
      isAdmin: isAdmin,
      password: bcrypt.hashSync(password, 10),
    });
    const createdUser = await user.save();

    return res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isEmail(email)) return res.status(401).send({ message: 'Invalid Email' });

    if (password.length < 6) {
      return res.status(401).send({ message: 'Password must be atleast 6 characters' });
    }

    const user = await User.findOne({ email });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      }
    }
    return res.status(401).send({ message: 'Invalid email or password' });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: 'User Not Found' });
    }
    return res.send(user);
  } catch (error) {
    res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, avatar, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!isEmail(email)) {
      return res.status(401).send({ message: 'Invalid Email' });
    }

    if (user && bcrypt.compareSync(currentPassword, user.password)) {
      const checkEmail = await User.find({ email });

      if (checkEmail.length > 1) {
        return res.status(401).send({ message: 'Invalid Email' });
      }

      user.name = name || user.name;
      user.email = email || user.email;
      user.avatar = avatar || user.avatar;

      if (newPassword) {
        user.password = bcrypt.hashSync(newPassword, 10);
      }

      const updatedUser = await user.save();

      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      return res.status(401).send({ message: 'Password Incorrect' });
    }
  } catch (error) {
    res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};
