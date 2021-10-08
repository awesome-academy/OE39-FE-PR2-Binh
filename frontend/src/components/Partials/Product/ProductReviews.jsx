import React from 'react';
import Rating from '../../Features/Rating';

function ProductReviews(props) {
  return (
    <div className="product__reviews">
      <h3 className="product__reviews-number">Reviews (2)</h3>
      <div className="product__reviews-list">
        <div className="product__reviews-item">
          <div className="row no-gutters">
            <div className="col-auto">
              <h4 className="product__reviews-name">Samanta J.</h4>
              <Rating rating={5} />
              <div className="product__reviews-date">6 days ago</div>
            </div>
            <div className="col">
              <h4 className="product__reviews-caption">Very good</h4>
              <div className="product__reviews-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores
                  assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis
                  commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae
                  voluptas!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product__reviews-action">
        <h3 className="product__reviews-title">Add a Review</h3>
        <div className="product__reviews-rating">
          <span>Your rating * </span>
          <span>Raing here</span>
        </div>
        <form action="" className="product__reviews-form">
          <textarea
            id="reply-message"
            cols="30"
            rows="6"
            class="form-control mb-2"
            placeholder="Comment *"
            required=""
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductReviews;
