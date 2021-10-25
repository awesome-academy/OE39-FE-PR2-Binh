import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_RESET } from '../../../redux/constants/filterContants';

function SearchClearnFilter(props) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const { filterCategory, filterBrand, filterRating, filterPrice, filterName } = filters;

  const isDisplay = useMemo(() => {
    const checkDisplay =
      Boolean(filterCategory.length > 0) ||
      Boolean(filterBrand.length > 0) ||
      Boolean(filterRating > 0) ||
      Boolean(filterPrice[0] > 0 && filterPrice[1] > 0) ||
      Boolean(filterName);

    return checkDisplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const clearnFilter = (e) => {
    e.preventDefault();

    dispatch({ type: FILTER_RESET });
  };

  return (
    <>
      {isDisplay && (
        <div className="mb-2 d-flex justify-content-center">
          <button className="btn btn-outline-primary" onClick={clearnFilter}>
            <i className="las la-eraser"></i>
            <span>Clearn Filters</span>
          </button>
        </div>
      )}
    </>
  );
}

export default SearchClearnFilter;
