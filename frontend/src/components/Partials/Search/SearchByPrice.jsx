import { Input, Slider } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_PAGE, FILTER_BY_PRICE } from '../../../redux/constants/filterContants';

function SearchByPrice(props) {
  const { filterPrice } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  function handleSlider(values) {
    dispatch({ type: FILTER_BY_PAGE, payload: 1 });
    dispatch({ type: FILTER_BY_PRICE, payload: values });
  }

  return (
    <div className="search__price search__item">
      <h3 className="search__title">Price</h3>
      <div className="search__content">
        <Slider
          tipFormatter={(v) => `$${v}`}
          range
          step={10}
          value={filterPrice}
          onChange={handleSlider}
          max="4999"
          className="mb-2"
        />

        <Input.Group compact>
          <Input
            type="number"
            style={{ width: '45%', textAlign: 'center' }}
            placeholder="Minimum"
            value={filterPrice[0]}
          />
          <Input
            className="site-input-split"
            style={{
              width: '10%',
              textAlign: 'center',
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: 'none',
            }}
            placeholder="~"
            disabled
          />
          <Input
            type="number"
            style={{
              width: '45%',
              textAlign: 'center',
            }}
            placeholder="Maximum"
            value={filterPrice[1]}
          />
        </Input.Group>
      </div>
    </div>
  );
}

export default SearchByPrice;
