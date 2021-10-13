import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './components/Features/Product';
import ProductSkeleton from './components/Features/Skeleton/ProductSkeleton';
import Footer from './components/Partials/Footer/Footer';
import Header from './components/Partials/Header/Header';
import { listProducts } from './redux/actions/productActions';

function App() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container mt-4 mb-4">
        <div className="row">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div key={index} className="col-lg-3 col-md-4 col-xs-6">
                <ProductSkeleton />
              </div>
            ))
          ) : error ? (
            <div>{error}</div>
          ) : (
            products.map((product, index) => (
              <div key={product._id} className="col-lg-3 col-md-4 col-xs-6">
                <Product product={product} />
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
