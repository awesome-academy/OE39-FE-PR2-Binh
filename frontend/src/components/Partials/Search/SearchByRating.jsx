import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FILTER_BY_RATING } from '../../../redux/constants/filterContants';
import { ratings } from '../../../utils';
import Rating from '../../Features/Rating';

function SearchByRating(props) {
  const dispatch = useDispatch();
  const { filterRating } = useSelector((state) => state.filters);

  function chooseRating(rating) {
    dispatch({ type: FILTER_BY_RATING, payload: rating });
  }
  return (
    <div className="search__rating search__item">
      <h3 className="search__title">Rating</h3>
      <div className="search__content">
        <ul>
          {ratings.map((r) => (
            <li
              className={filterRating === r.rating ? 'active' : ''}
              onClick={(e) => chooseRating(r.rating)}
              key={r.name}
            >
              <Rating caption={' & up'} rating={r.rating}></Rating>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchByRating;
