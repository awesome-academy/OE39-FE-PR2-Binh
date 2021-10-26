import React from 'react';
import Skeleton from 'react-loading-skeleton';

function QuickViewSkeleton(props) {
  return (
    <div>
      <div className="product__details-wrapper">
        <div className="row">
          <div className="col-md-6">
            <div className="product__gallery product__gallery-horizontal">
              <div className="product__image-main">
                <Skeleton height={500} />
              </div>
              <div className="product__image-list d-block">
                <Skeleton
                  width={'25%'}
                  height={'100px'}
                  count={3}
                  style={{ marginRight: '10px' }}
                />
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
    </div>
  );
}

export default QuickViewSkeleton;
