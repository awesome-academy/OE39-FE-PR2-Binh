import { Rate, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../../Features/Rating';
import { calculateTime, handleSubjectReview } from '../../../utils';
import { createReview } from '../../../redux/actions/productActions';
import MessageBox from '../../Features/MessageBox';
import LoadingBox from '../../Features/LoadingBox';
import { Link } from 'react-router-dom';
import { showSignInModal } from '../../../redux/actions/modalActions';
import { PRODUCT_REVIEW_CREATE_RESET } from '../../../redux/constants/productConstants';

const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

function ProductReviews({ product }) {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { loading, error, success, review } = productReviewCreate;

  useEffect(() => {
    if (success) {
      setRating(0);
      setDescription('');
      product.reviews.push({
        ...review,
        user: {
          _id: review.user,
          name: userInfo.name,
          avatar: userInfo.avatar,
        },
      });
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, success]);

  const handleChange = (value) => {
    setRating(value);
  };

  const createReviewHandler = (e) => {
    e.preventDefault();

    const review = {
      rating,
      subject: handleSubjectReview(rating),
      description,
    };

    dispatch(createReview(product._id, review));
  };

  function onShowSignInModal(e) {
    e.preventDefault();
    dispatch(showSignInModal());
  }

  return (
    <div className="product__reviews">
      <h3 className="product__reviews-number">{`${
        product.reviews.length > 1 ? 'Reviews' : 'Review'
      } (${product.reviews.length})`}</h3>
      <div className="product__reviews-list">
        {product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review._id} className="product__reviews-item">
              <div className="row no-gutters">
                <div className="col-auto">
                  <div className="product__reviews-author">
                    <div className="product__reviews-avatar">
                      <Avatar shape="circle" size={36} src={review.user.avatar} />
                    </div>
                    <h4 className="product__reviews-name">{review.user.name}</h4>
                  </div>

                  <Rating rating={review.rating} />
                  <div className="product__reviews-date">{calculateTime(review.createdAt)}</div>
                </div>
                <div className="col">
                  <div className="product__reviews-actions">
                    <h4 className="product__reviews-caption">{review.subject}</h4>
                    <div className="product__reviews-update-delete">
                      <i className="product__reviews-actions-icon las la-ellipsis-h"></i>
                      <ul className="product__reviews-actions-vertical">
                        <li>
                          <i className="las la-edit"></i>
                          <span>Edit</span>
                        </li>
                        <li>
                          <i className="las la-trash"></i>
                          <span>Delete</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="product__reviews-content">
                    <p>{review.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <MessageBox variant="info" adClass="mb-2">
            Product no review
          </MessageBox>
        )}
      </div>
      {!userInfo && (
        <MessageBox adClass="mb-2">
          Please{' '}
          <Link to="/signin" onClick={onShowSignInModal}>
            Sign In
          </Link>{' '}
          to write a review
        </MessageBox>
      )}
      <div className="product__reviews-action">
        <h3 className="product__reviews-title">Add a Review</h3>
        <div className="product__reviews-rating">
          <span className="product__reviews-rating-text">Your rating *</span>
          <span className="product__reviews-rating-action">
            <Rate tooltips={desc} onChange={handleChange} value={rating} disabled={!userInfo} />
          </span>
        </div>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <form onSubmit={createReviewHandler} className="product__reviews-form">
          <textarea
            id="reply-message"
            cols="30"
            rows="6"
            className="form-control mb-2"
            placeholder="Comment *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="btn btn-primary" disabled={!userInfo}>
            Submit
            {loading && <LoadingBox />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductReviews;
