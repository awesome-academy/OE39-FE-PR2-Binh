import { Button, Form, Input, Spin, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import {
  createCategory,
  detailsCategory,
  listCategories,
} from '../../../redux/actions/categoryActions';
import { CATEGORY_CREATE_RESET } from '../../../redux/constants/categoryConstants';
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

  const onFinish = (values) => {
    dispatch(createCategory(values));
  };

  useEffect(() => {
    if (successCreate) {
      setCategoryValues(initCategoryValues);
      dispatch({ type: CATEGORY_CREATE_RESET });
    }
    dispatch(listCategories(1, 100));
  }, [dispatch, successCreate]);

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
    form.setFieldsValue(categoryValues);
  }, [categoryValues, form]);

  return (
    <div>
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {errorDetails && <MessageBox variant="danger">{errorDetails}</MessageBox>}
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
          <Button type="primary" htmlType="submit" loading={loadingCreate}>
            {isAddMode ? 'Create' : 'Update'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CategoryForm;
