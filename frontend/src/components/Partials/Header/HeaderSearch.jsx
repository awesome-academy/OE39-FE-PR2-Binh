import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FILTER_BY_NAME, FILTER_BY_PAGE } from '../../../redux/constants/filterContants';

function HeaderSearch(props) {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const typingTimeoutRef = useRef(null);

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const { filterName } = filters;

  useEffect(() => {
    setSearch(filterName);
  }, [filterName]);

  function onChangeHandler(e) {
    setSearch(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      dispatch({ type: FILTER_BY_PAGE, payload: 1 });
      dispatch({ type: FILTER_BY_NAME, payload: e.target.value });
    }, 300);
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
            value={search}
            onChange={onChangeHandler}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default HeaderSearch;
