import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    description: { type: String, maxlength: 300, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
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
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    images: {
      type: Array,
    },
    isNew: { type: Boolean },
    isTop: { type: Boolean },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: false },
    countInStock: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
