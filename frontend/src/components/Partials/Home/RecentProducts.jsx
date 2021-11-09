import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import catchErrors from '../../../utils/catchErrors';
import Product from '../../Features/Product';
import ProductSkeleton from '../../Features/Skeleton/ProductSkeleton';

const tabCategories = [
  { title: 'All', value: 'all' },
  { title: 'Furniture', value: 'furniture' },
  { title: 'Decoration', value: 'decoration' },
  { title: 'Lighting', value: 'lighting' },
];

function RecentProducts(props) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [currPage, setCurrPage] = useState(1);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/products?category=${category}&pageNumber=${currPage}`
      );
      if (data.products.length < 8) {
        setHasMore(false);
      }
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(catchErrors(error));
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const loadMoreProducts = async (e) => {
    e.preventDefault();
    setLoadMoreLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/products?category=${category}&pageNumber=${
          currPage + 1
        }`
      );
      if (data.products.length < 8) {
        setHasMore(false);
      }
      setProducts((prev) => [...prev, ...data.products]);
      setCurrPage((prev) => prev + 1);
      setLoadMoreLoading(false);
    } catch (error) {
      setLoadMoreLoading(false);
      setError(catchErrors(error));
    }
  };

  const changeCategory = (category) => {
    setCategory(category);
    setCurrPage(1);
    setProducts([]);
    setLoadMoreLoading(false);
    setHasMore(true);
  };

  return (
    <Tabs defaultIndex={0} selectedTabClassName="show">
      <div className="container">
        <div className="heading mb-2 mt-5">
          <h2 className="title">Recent Arrivals</h2>
          <TabList className="nav nav-pills nav-border-anim justify-content-center">
            {tabCategories.map((category) => (
              <Tab
                key={category.value}
                onClick={() => changeCategory(category.value)}
                className="nav-item"
              >
                <span className="nav-link">{category.title}</span>
              </Tab>
            ))}
          </TabList>
        </div>
      </div>

      <div className="container">
        {tabCategories.map((category) => (
          <TabPanel key={category.value}>
            <div className="products">
              <div className="row">
                {!loadMoreLoading && loading ? (
                  [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <div key={index} className="col-6 col-md-4 col-lg-3">
                      <ProductSkeleton />
                    </div>
                  ))
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  products.map((product) => (
                    <div key={product._id} className="col-6 col-md-4 col-lg-3">
                      <Product product={product} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabPanel>
        ))}
      </div>

      {hasMore ? (
        <div className="container text-center mt-2 mb-7">
          <a href="/" className="btn btn-outline-darker btn-load-more" onClick={loadMoreProducts}>
            <span className="mr-3">Load more products</span>
            <i className={`las la-sync ${loadMoreLoading ? 'load-more-rotating' : ''}`}></i>
          </a>
        </div>
      ) : (
        ''
      )}
    </Tabs>
  );
}

export default RecentProducts;
