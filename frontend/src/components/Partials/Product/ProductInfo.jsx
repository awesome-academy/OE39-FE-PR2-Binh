import React from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import ProductReviews from './ProductReviews';

function ProductInfo(props) {
  const { product } = props;
  return (
    <div className="product__infos">
      <Tabs selectedTabClassName="show" selectedTabPanelClassName="show active">
        <TabList className="nav nav-pills nav-border-anim justify-content-center">
          <Tab className="nav-item">
            <span className="nav-link">Description</span>
          </Tab>
          <Tab className="nav-item">
            <span className="nav-link">Additional information</span>
          </Tab>
          <Tab className="nav-item">
            <span className="nav-link">Shipping & Returns</span>
          </Tab>
          <Tab className="nav-item">
            <span className="nav-link">Reviews</span>
          </Tab>
        </TabList>

        <div className="tab-content">
          <TabPanel className="tab-pane fade">
            <div className="product__desc">{product.description}</div>
          </TabPanel>
          <TabPanel className="tab-pane">
            <div className="product__info-plus">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque
                volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non,
                semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                Aliquam porttitor mauris sit amet orci.
              </p>
            </div>
          </TabPanel>
          <TabPanel className="tab-pane fade">
            <div className="product__policy">
              <p>
                We deliver to over 100 countries around the world. For full details of the delivery
                options we offer, please view our Delivery information.
              </p>
              <p>
                We hope you’ll love every purchase, but if you ever need to return an item you can
                do so within a month of receipt. For full details of how to make a return, please
                view our
              </p>
            </div>
          </TabPanel>
          <TabPanel className="tab-pane fade">
            <ProductReviews />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}

export default ProductInfo;
