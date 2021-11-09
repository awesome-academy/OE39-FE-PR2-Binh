import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsRelatedMore } from '../../../redux/actions/productActions';
import { PRODUCT_RELATED_LOADMORE_RESET } from '../../../redux/constants/productConstants';
import Product from '../../Features/Product';

function ProductRelated(props) {
  const [products, setProducts] = useState(props.products);
  const [hasMore, setHasMore] = useState(props.hasMore);
  const [currPage, setCurrPage] = useState(1);

  const dispatch = useDispatch();
  const productListRelatedMore = useSelector((state) => state.productListRelatedMore);
  const {
    products: productsRelatedMore,
    loading: loadingRelatedMore,
    error: errorRelatedMore,
  } = productListRelatedMore;

  useEffect(() => {
    if (productsRelatedMore) {
      if (productsRelatedMore.length < 8) {
        setHasMore(false);
      }
      setProducts([...products, ...productsRelatedMore]);
      dispatch({ type: PRODUCT_RELATED_LOADMORE_RESET });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsRelatedMore]);

  const loadMoreProducts = async (e) => {
    e.preventDefault();
    setCurrPage((prev) => prev + 1);

    dispatch(listProductsRelatedMore(props.product, currPage + 1));
  };

  return (
    <div className="product__related">
      <div className="heading mb-2 mt-5">
        <h2 className="title">You May Also Like</h2>
      </div>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <Product product={product} />
          </div>
        ))}
      </div>

      {errorRelatedMore && <div>{errorRelatedMore}</div>}

      {hasMore ? (
        <div className="container text-center mt-2 mb-7">
          <a href="/" className="btn btn-outline-darker btn-load-more" onClick={loadMoreProducts}>
            <span className="mr-3">Load more products</span>
            <i className={`las la-sync ${loadingRelatedMore ? 'load-more-rotating' : ''}`}></i>
          </a>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default ProductRelated;
