import { Button, Form, Input, Spin, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, listCategories } from '../../../redux/actions/categoryActions';
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

  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading = true, error, categories } = categoryList;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = categoryCreate;

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

  return (
    <div>
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      <Form layout="vertical" initialValues={categoryValues} onFinish={onFinish}>
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
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CategoryForm;
