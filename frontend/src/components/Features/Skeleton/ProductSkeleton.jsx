import React from 'react';
import Skeleton from 'react-loading-skeleton';

function ProductSkeleton(props) {
  return (
    <div className="product">
      <figure className="product__media">
        <Skeleton height={'100%'} width={'100%'} />
      </figure>

      <div className="mt-1 p-2">
        <Skeleton count={4} />
      </div>
    </div>
  );
}

export default ProductSkeleton;
