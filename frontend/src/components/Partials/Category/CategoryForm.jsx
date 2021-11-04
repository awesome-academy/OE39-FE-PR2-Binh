import { Button, Form, Input, Spin, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import {
  createCategory,
  detailsCategory,
  listCategories,
  updateCategory,
} from '../../../redux/actions/categoryActions';
import {
  CATEGORY_CREATE_RESET,
  CATEGORY_UPDATE_RESET,
} from '../../../redux/constants/categoryConstants';
import { arrayToTree, changeArray } from '../../../utils';
import MessageBox from '../../Features/MessageBox';

const initCategoryValues = {
  name: '',
  parent: null,
  description: '',
};

function CategoryForm(props) {
  const [categoryValues, setCategoryValues] = useState(initCategoryValues);

  const { search } = useLocation();
  let { edit: slug } = queryString.parse(search);
  const isAddMode = !search;

  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading = true, error, categories } = categoryList;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = categoryCreate;

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    category: categoryDetail,
  } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = categoryUpdate;

  const onFinish = (values) => {
    if (isAddMode) {
      dispatch(createCategory(values));
    } else {
      dispatch(updateCategory(values, slug));
    }
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: CATEGORY_CREATE_RESET });
    }
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
    }
    dispatch(listCategories(1, 100));
  }, [dispatch, successCreate, successUpdate]);

  useEffect(() => {
    if (!isAddMode) {
      if (!categoryDetail || categoryDetail.slug !== slug) {
        dispatch(detailsCategory(slug));
      } else {
        setCategoryValues({
          name: categoryDetail.name,
          parent: categoryDetail.parent,
          description: categoryDetail.description,
        });
      }
    }
  }, [dispatch, isAddMode, slug, categoryDetail]);

  const [form] = Form.useForm();
  useEffect(() => {
    if (isAddMode || successCreate) {
      setCategoryValues(initCategoryValues);
      form.setFieldsValue(initCategoryValues);
    } else {
      form.setFieldsValue(categoryValues);
    }
  }, [categoryValues, form, isAddMode, successCreate]);

  return (
    <div>
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {errorDetails && <MessageBox variant="danger">{errorDetails}</MessageBox>}
      {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
      {loadingDetails && (
        <div className="text-center">
          <Spin />
        </div>
      )}
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="parent" label="Selet parent">
          {loading ? (
            <div className="text-center">
              <Spin />
            </div>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <TreeSelect
              treeDefaultExpandAll
              placeholder="Empty"
              treeData={arrayToTree(changeArray(categories))}
            />
          )}
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loadingCreate || loadingUpdate}>
            {isAddMode ? 'Create' : 'Update'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CategoryForm;
