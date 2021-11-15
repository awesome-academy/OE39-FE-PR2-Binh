import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FILTER_BY_NAME } from '../../../redux/constants/filterContants';

function HeaderSearch(props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const { filterName } = useSelector((state) => state.filters);

  function onChangeHandler(e) {
    dispatch({ type: FILTER_BY_NAME, payload: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    if (history.location.pathname === '/search') {
      return;
    } else {
      history.push(`/search`);
    }
  }

  function onSearchToggle(e) {
    e.stopPropagation();
    document.querySelector('.header .header__search-toggle').classList.toggle('active');
    document.querySelector('.header .header__search-wrapper').classList.toggle('show');
  }
  return (
    <div className="header__search">
      <button className="header__search-toggle" onClick={onSearchToggle}>
        <i className="las la-search"></i>
      </button>

      <form onSubmit={submitHandler}>
        <div className="header__search-wrapper">
          <label htmlFor="search" className="sr-only" required>
            Search
          </label>
          <input
            type="text"
            className="form-control"
            name="search"
            placeholder="Search product ..."
            value={filterName}
            onChange={onChangeHandler}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default HeaderSearch;
