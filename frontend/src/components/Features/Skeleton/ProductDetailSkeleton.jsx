import React from 'react';
import Skeleton from 'react-loading-skeleton';
import ProductSkeleton from './ProductSkeleton';

function ProductDetailSkeleton(props) {
  return (
    <div className="product__details-wrapper">
      <div className="product__details-top">
        <div className="row">
          <div className="col-md-6">
            <div className="product__gallery">
              <div className="product__image-main">
                <Skeleton height={500} />
              </div>
              <div className="product__image-list">
                <Skeleton width={'100%'} height={'100px'} count={4} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product__detail">
              <div className="product__title" style={{ marginTop: '3px' }}>
                <Skeleton width={'60%'} height={'30px'} />
              </div>
              <div className="product__rating">
                <Skeleton width={'40%'} height={'20px'} />
              </div>
              <div className="product__price d-block mb-1">
                <Skeleton width={'30%'} height={'20px'} />
              </div>
              <div className="product__desc">
                <Skeleton width={'100%'} height={'20px'} count={4} />
              </div>
              <div className="product__quantity mt-1">
                <Skeleton width={'50%'} height={'30px'} />
              </div>
              <div className="product__detail-action d-block mt-1">
                <Skeleton width={'70%'} height={'30px'} />
              </div>
              <div className="product__detail-footer d-block">
                <div className="product__category">
                  <Skeleton width={'60%'} height={'20px'} />
                </div>
                <div className="product__social">
                  <Skeleton width={'50%'} height={'20px'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product__details-bottom">
        <div className="product__infos">
          <Skeleton width={'100%'} height={'20px'} count={8} />
        </div>
        <div className="product__related mt-3">
          <div className="heading mb-2 mt-5">
            <h2 className="title">You May Also Like</h2>
          </div>
          <div className="row">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3">
                <ProductSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
