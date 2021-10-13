import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: 'Category',
    },
    ancestors: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
          index: true,
        },
        name: String,
        slug: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', CategorySchema);
export default Category;
