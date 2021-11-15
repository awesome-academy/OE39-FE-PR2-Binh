import { Checkbox, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductBrands } from '../../../redux/actions/productActions';
import { FILTER_BY_BRAND, FILTER_BY_PAGE } from '../../../redux/constants/filterContants';
import MessageBox from '../../Features/MessageBox';

function SearchByBrand(props) {
  const [search, setSearch] = useState('');
  const [brandSearch, setBrandSearch] = useState([]);
  const dispatch = useDispatch();
  const productBrandList = useSelector((state) => state.productBrandList);
  const { loading, error, brands } = productBrandList;

  const { filterBrand } = useSelector((state) => state.filters);

  const brandWithSearch = brandSearch?.filter((brand) => brand.toLowerCase().includes(search));

  function onChange(e) {
    dispatch({ type: FILTER_BY_PAGE, payload: 1 });

    const isCheck = e.target.checked;
    const value = e.target.value;
    const findIdx = filterBrand.findIndex((brand) => brand === value);
    const isExisting = findIdx !== -1;
    if (!isExisting && isCheck) {
      dispatch({ type: FILTER_BY_BRAND, payload: [...filterBrand, value] });
    } else if (!isCheck) {
      dispatch({
        type: FILTER_BY_BRAND,
        payload: filterBrand.filter((brand) => brand !== value),
      });
    }
  }

  useEffect(() => {
    if (!brands) {
      dispatch(listProductBrands());
    } else {
      setBrandSearch(brands);
    }
  }, [dispatch, brands]);

  return (
    <div className="search__brand search__item">
      <h3 className="search__title">Brand</h3>
      <div className="search__content">
        <form className="brand__form">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="brand"
            className="form-control"
            placeholder="Search for another..."
          />
        </form>
        <div className="branch__checkbox">
          {loading && (
            <div className="text-center">
              <Spin />
            </div>
          )}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {brandWithSearch?.length > 0 ? (
            brandWithSearch.map(
              (brand, index) =>
                index < 5 && (
                  <p key={index} style={{ marginBottom: '8px' }}>
                    <Checkbox
                      value={brand}
                      checked={filterBrand.indexOf(brand) !== -1}
                      onChange={onChange}
                    >
                      {brand}
                    </Checkbox>
                  </p>
                )
            )
          ) : (
            <MessageBox variant="info">Brand not found</MessageBox>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchByBrand;
