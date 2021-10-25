import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Spin } from 'antd';
import { FILTER_BY_ORDER } from '../../../redux/constants/filterContants';

const { Option } = Select;

function SearchByOrder({ loading, error, paginations }) {
  const dispatch = useDispatch();
  const { orderBy } = useSelector((state) => state.filters);

  function onChangeHandler(value) {
    dispatch({ type: FILTER_BY_ORDER, payload: value });
  }
  return (
    <div className="search__order d-flex justify-content-between align-items-center">
      <div className="search__order-left">
        {loading ? (
          <Spin size="small" />
        ) : error ? (
          <span>Opp, error...!</span>
        ) : (
          <span>{`${paginations.total} ${paginations.total > 0 ? 'results' : 'result'}`}</span>
        )}
      </div>
      <div className="search__order-right">
        <Select defaultValue={orderBy} name="orders" onChange={onChangeHandler}>
          <Option value="newest">Newest Arrivals</Option>
          <Option value="lowest">Price: Low to High</Option>
          <Option value="highest">Price: High to Low</Option>
          <Option value="toprated">Avg. Customer Reviews</Option>
        </Select>
      </div>
    </div>
  );
}

export default SearchByOrder;
