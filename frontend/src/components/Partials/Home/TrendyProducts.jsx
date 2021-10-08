import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';
import { listProducts } from '../../../redux/actions/productActions';
import Product from '../../Features/Product';
import ProductSkeleton from '../../Features/Skeleton/ProductSkeleton';
import SlickCarousel from '../../Features/SlickCarousel';

const tabCategories = [
  { title: 'All', value: 'all' },
  { title: 'Furniture', value: 'furniture' },
  { title: 'Decoration', value: 'decoration' },
  { title: 'Lighting', value: 'lighting' },
];

function TrendyProducts(props) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('all');
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({ category: category === 'all' ? '' : category }));
  }, [dispatch, category]);

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 6000,
  };

  return (
    <Tabs defaultIndex={0} selectedTabClassName="show">
      <div className="container">
        <div className="heading mb-2 mt-6">
          <h2 className="title">Trendy Products</h2>
          <TabList className="nav nav-pills nav-border-anim justify-content-center">
            {tabCategories.map((category) => (
              <Tab
                key={category.value}
                onClick={() => setCategory(category.value)}
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
            {loading ? (
              <SlickCarousel adClass="product__carousel" options={settings}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <ProductSkeleton key={index} />
                ))}
              </SlickCarousel>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <SlickCarousel adClass="product__carousel" options={settings}>
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </SlickCarousel>
            )}
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
}

export default TrendyProducts;
