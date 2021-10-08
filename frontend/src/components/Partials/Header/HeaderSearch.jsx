import React from 'react';

function HeaderSearch(props) {
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

      <form action="#">
        <div className="header__search-wrapper">
          <label htmlFor="search" className="sr-only" required>
            Search
          </label>
          <input
            type="text"
            className="form-control"
            name="search"
            placeholder="Search product ..."
            required
          />
        </div>
      </form>
    </div>
  );
}

export default HeaderSearch;
