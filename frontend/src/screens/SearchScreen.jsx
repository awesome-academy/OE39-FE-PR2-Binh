import React from 'react';
import SearchByBrand from '../components/Partials/Search/SearchByBrand';
import SearchByCategory from '../components/Partials/Search/SearchByCategory';
import SearchByOrder from '../components/Partials/Search/SearchByOrder';
import SearchByPrice from '../components/Partials/Search/SearchByPrice';
import SearchByRating from '../components/Partials/Search/SearchByRating';

function SearchScreen(props) {
  return (
    <div className="main">
      <div className="container">
        <div className="search">
          <div className="row">
            <div className="col-lg-3">
              <SearchByCategory />
              <SearchByBrand />
              <SearchByRating />
              <SearchByPrice />
            </div>
            <div className="col-lg-9">
              <SearchByOrder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
