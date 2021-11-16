import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import isEmail from 'validator/lib/isEmail.js';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils/authMiddleware.js';
import { transporter, forgotPasswordEmailTemplate } from '../utils/sendGrid.js';

dotenv.config();

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
    const { name, email, password, isAdmin = false, avatar = 'avatar-default' } = req.body;

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
      avatar: avatar,
      isAdmin: isAdmin,
      password: bcrypt.hashSync(password, 10),
    });
    const createdUser = await user.save();

    return res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      avatar: createdUser.avatar,
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
          avatar: user.avatar,
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
        avatar: updatedUser.avatar,
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

export const listUsers = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await User.count({});

    const users = await User.find({})
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.send({
      users,
      pageSize,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize),
      totalRows: count,
    });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User Not Found' });
    }
    if (user.email === 'tranbinh241999@gmail.com') {
      return res.status(400).send({ message: 'Can Not Delete This Admin' });
    }
    const deleted = await user.remove();
    res.send({ message: 'User Deleted', user: deleted });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, isAdmin } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User Not Found' });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin;
    const updated = await user.save();
    res.send({ message: 'User Updated', user: updated });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!isEmail(email)) {
      return res.status(401).send({ message: 'Invalid Email' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).send({ message: 'User Not Found' });
    }

    const token = crypto.randomBytes(32).toString('hex');

    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;

    await user.save();

    const href = `${process.env.BASE_URL_FRONTEND}/forgot?token=${token}`;

    const mailOptions = {
      to: user.email,
      from: 'anhbinh2499@gmail.com',
      subject: 'Hi there! Password reset request',
      html: forgotPasswordEmailTemplate(user, href),
    };

    transporter.sendMail(mailOptions, (err, info) => err && console.log(err));

    return res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    if (password.length < 6) {
      return res.status(401).send({ message: 'Password must be atleast 6 characters' });
    }

    const user = await User.findOne({ resetToken: token });

    if (!user) {
      return res.status(404).send({ message: 'Token incorrect' });
    }

    if (Date.now() > user.expireToken) {
      return res.status(401).send({ message: 'Token expired, generate new one' });
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetToken = '';
    user.expireToken = undefined;

    await user.save();

    return res.status(200).send({ message: 'Password updated' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'An error occurred. Please try again later' });
  }
};
