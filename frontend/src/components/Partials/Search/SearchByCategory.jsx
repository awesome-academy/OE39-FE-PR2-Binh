import { Spin, Tree } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../../../redux/actions/categoryActions';
import { FILTER_BY_CATEGORY, FILTER_BY_PAGE } from '../../../redux/constants/filterContants';
import { arrayToTree, changeArray } from '../../../utils';
import MessageBox from '../../Features/MessageBox';

function SearchByCategory(props) {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const { filterCategory } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const onSelect = (selectedKeysValue) => {
    dispatch({ type: FILTER_BY_PAGE, payload: 1 });
    dispatch({ type: FILTER_BY_CATEGORY, payload: selectedKeysValue });
  };

  return (
    <div className="search__category search__item">
      <h3 className="search__title">Category</h3>
      <div className="search__content">
        {loading ? (
          <div className="text-center">
            <Spin />
          </div>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Tree
            selectable
            onExpand={false}
            onSelect={onSelect}
            selectedKeys={filterCategory}
            treeData={arrayToTree(changeArray(categories, 'key'), 'key')}
          />
        )}
      </div>
    </div>
  );
}

export default SearchByCategory;
