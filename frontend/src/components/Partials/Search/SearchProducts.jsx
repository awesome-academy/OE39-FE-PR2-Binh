import React from 'react';
import MessageBox from '../../Features/MessageBox';
import Product from '../../Features/Product';
import ProductSkeleton from '../../Features/Skeleton/ProductSkeleton';

function SearchProducts({ loading, error, products }) {
  return (
    <div className="search__products mt-2">
      <div className="row">
        {loading ? (
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <div key={index} className="col-6 col-md-4 col-lg-4">
              <ProductSkeleton />
            </div>
          ))
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          products.map((product, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-4">
              <Product product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchProducts;
