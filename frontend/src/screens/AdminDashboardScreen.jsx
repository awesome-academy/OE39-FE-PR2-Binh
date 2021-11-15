import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Line, Pie } from '@ant-design/charts';
import { summaryOrder } from '../redux/actions/orderActions';
import MessageBox from '../components/Features/MessageBox';

function AdminDashboardScreen(props) {
  const dispatch = useDispatch();
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, error, summary } = orderSummary;

  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);

  var config = {
    data: summary?.summaryOrders,
    xField: '_id',
    yField: 'value',
    seriesField: 'category',
    xAxis: { type: 'time' },
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
  };

  var configPieBrand = {
    appendPadding: 10,
    data: summary?.productBrands,
    angleField: 'count',
    colorField: '_id',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: function content(_ref) {
        var percent = _ref.percent;
        return ''.concat((percent * 100).toFixed(0), '%');
      },
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  var configPieCategory = {
    appendPadding: 10,
    data: summary?.productCategories,
    angleField: 'count',
    colorField: '_id',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: function content(_ref) {
        var percent = _ref.percent;
        return ''.concat((percent * 100).toFixed(0), '%');
      },
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div className="dashboard__summary">
      <div className="row">
        <div className="col-lg-4">
          <div className="summary summary--primary">
            <div className="summary__content">
              <h3 className="summary__caption">Users</h3>
              <div className="summary__count">
                {loading ? (
                  <Spin />
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  summary.users[0].numUsers
                )}
              </div>
            </div>
            <div className="summary__icon">
              <i className="las la-user"></i>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="summary summary--success">
            <div className="summary__content">
              <h3 className="summary__caption">Orders</h3>
              <div className="summary__count">
                {loading ? (
                  <Spin />
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : summary.orders[0] ? (
                  summary.orders[0].numOrders
                ) : (
                  0
                )}
              </div>
            </div>
            <div className="summary__icon">
              <i className="las la-cart-arrow-down"></i>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="summary summary--info">
            <div className="summary__content">
              <h3 className="summary__caption">Sales</h3>
              <div className="summary__count">
                {loading ? (
                  <Spin />
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : summary.orders[0] ? (
                  `$${summary.orders[0].totalSales.toFixed(2)}`
                ) : (
                  `$0`
                )}
              </div>
            </div>
            <div className="summary__icon">
              <i className="las la-money-bill"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="summary__section">
          <h2 className="summary__title">Sales</h2>
          {loading ? (
            <div className="text-center">
              <Spin />
            </div>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Line {...config} />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="summary__section">
            <h2 className="summary__title">Brands</h2>
            {loading ? (
              <div className="text-center">
                <Spin />
              </div>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <Pie {...configPieBrand} />
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="summary__section">
            <h2 className="summary__title">Categories</h2>
            {loading ? (
              <div className="text-center">
                <Spin />
              </div>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <Pie {...configPieCategory} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardScreen;
