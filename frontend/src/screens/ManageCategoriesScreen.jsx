import React from 'react';
import CategoryForm from '../components/Partials/Category/CategoryForm';
import CategoryList from '../components/Partials/Category/CategoryList';

function ManageCategoriesScreen(props) {
  return (
    <div className="dashboard__category">
      <div className="row">
        <div className="col-lg-4">
          <CategoryForm />
        </div>
        <div className="col-lg-8">
          <CategoryList />
        </div>
      </div>
    </div>
  );
}

export default ManageCategoriesScreen;
