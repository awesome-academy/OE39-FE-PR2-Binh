import User from '../models/userModel.js';
import data from '../data.js';

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
