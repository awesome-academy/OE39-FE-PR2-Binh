import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../components/Features/Breadcrumb';
import ProductDetailSkeleton from '../components/Features/Skeleton/ProductDetailSkeleton';
import ProductSkeleton from '../components/Features/Skeleton/ProductSkeleton';
import ProductDetail from '../components/Partials/Product/ProductDetail';
import ProductGallery from '../components/Partials/Product/ProductGallery';
import ProductInfo from '../components/Partials/Product/ProductInfo';
import ProductRelated from '../components/Partials/Product/ProductRelated';
import { detailsProduct, listProductsRelated } from '../redux/actions/productActions';

function ProductScreen(props) {
  const { slug } = props.match.params;
  const ref = useRef(null);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productListRelated = useSelector((state) => state.productListRelated);
  const {
    products: productsRelated,
    loading: loadingRelated,
    error: errorRelated,
  } = productListRelated;

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    scrollToTop();
  }, [slug]);

  useEffect(() => {
    dispatch(listProductsRelated(slug));
    dispatch(detailsProduct(slug));
  }, [dispatch, slug]);

  return (
    <div className="main" ref={ref}>
      <Breadcrumb />
      <div className="container">
        {loading ? (
          <ProductDetailSkeleton />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="product__details-wrapper">
            <div className="product__details-top">
              <div className="row">
                <div className="col-md-6">
                  <ProductGallery product={product} />
                </div>
                <div className="col-md-6">
                  <ProductDetail product={product} />
                </div>
              </div>
            </div>
            <div className="product__details-bottom">
              <ProductInfo product={product} />
              {loadingRelated ? (
                <div className="row">
                  <div className="heading mb-2 mt-5">
                    <h2 className="title">You May Also Like</h2>
                  </div>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <div key={index} className="col-6 col-md-4 col-lg-3">
                      <ProductSkeleton />
                    </div>
                  ))}
                </div>
              ) : errorRelated ? (
                <div>{errorRelated}</div>
              ) : (
                <ProductRelated
                  product={slug}
                  products={productsRelated}
                  hasMore={productsRelated.length === 8 ? true : false}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductScreen;
