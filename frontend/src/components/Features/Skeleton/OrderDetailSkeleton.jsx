import React from 'react';
import Skeleton from 'react-loading-skeleton';

function OrderDetailSkeleton(props) {
  return (
    <div className="container">
      <Skeleton width={'30%'} height={30} />
      <div className="row mt-2">
        <div className="col-lg-8">
          <div className="order__shipping">
            <h2>Shipping</h2>
            <Skeleton width={'100%'} height={30} count={2} />
          </div>
          <div className="order__payment">
            <h2>Payment</h2>
            <Skeleton width={'100%'} height={30} count={2} />
          </div>
          <div className="order__items">
            <h2>Order Items</h2>
            <Skeleton width={'100%'} height={40} count={5} />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="order__summary">
            <Skeleton width={'100%'} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailSkeleton;
