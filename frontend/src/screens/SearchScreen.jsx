import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchByBrand from '../components/Partials/Search/SearchByBrand';
import SearchByCategory from '../components/Partials/Search/SearchByCategory';
import SearchByOrder from '../components/Partials/Search/SearchByOrder';
import SearchByPrice from '../components/Partials/Search/SearchByPrice';
import SearchByRating from '../components/Partials/Search/SearchByRating';
import SearchClearnFilter from '../components/Partials/Search/SearchClearnFilter';
import SearchPagination from '../components/Partials/Search/SearchPagination';
import SearchProducts from '../components/Partials/Search/SearchProducts';
import { listProductSearch } from '../redux/actions/productActions';

function SearchScreen(props) {
  const dispatch = useDispatch();
  const productSearch = useSelector((state) => state.productSearch);
  const { loading, error, products, paginations } = productSearch;

  const filters = useSelector((state) => state.filters);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    dispatch(listProductSearch());
    scrollToTop();
  }, [dispatch, filters]);

  return (
    <div className="main">
      <div className="container">
        <div className="search">
          <div className="row">
            <div className="col-lg-3">
              <SearchClearnFilter />
              <SearchByCategory />
              <SearchByBrand />
              <SearchByRating />
              <SearchByPrice />
            </div>
            <div className="col-lg-9">
              <div className="search__main">
                <SearchByOrder loading={loading} error={error} paginations={paginations} />
                <SearchProducts loading={loading} error={error} products={products} />
                <SearchPagination loading={loading} error={error} paginations={paginations} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
