import { Pagination, Spin } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { FILTER_BY_PAGE } from '../../../redux/constants/filterContants';

function SearchPagination({ loading, error, paginations }) {
  const dispatch = useDispatch();

  function onPageChange(current, pageSize) {
    dispatch({ type: FILTER_BY_PAGE, payload: current });
  }

  return (
    <div className="search__paginations mt-2 d-flex justify-content-center align-items-center">
      {loading ? (
        <Spin size="small" />
      ) : error ? (
        <span>Opp, error...!</span>
      ) : (
        <Pagination
          current={paginations.current}
          total={paginations.total}
          pageSize={paginations.pageSize}
          onChange={onPageChange}
        />
      )}
    </div>
  );
}

export default SearchPagination;
