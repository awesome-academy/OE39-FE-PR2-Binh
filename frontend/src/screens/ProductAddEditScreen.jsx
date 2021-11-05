import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Spin, TreeSelect } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/Features/MessageBox';
import { arrayToTree, changeArray } from '../utils';
import { listCategories } from '../redux/actions/categoryActions';
import FileUpload from '../components/Features/FileUpload';
import { createProduct } from '../redux/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants';

const initProductValues = {
  name: '',
  brand: '',
  price: '',
  salePrice: '',
  countInStock: '',
  description: '',
  categories: [],
  isNew: false,
  isTop: false,
};

function ProductAddEditScreen(props) {
  const [productValues, setProductValues] = useState(initProductValues);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading: loadingCategory, error: errorCategory, categories } = categoryList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product,
  } = productCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      setProductValues(initProductValues);
      props.history.push(`/admin/products/edit/${product.slug}`);
    }
    dispatch(listCategories(1, 100));
  }, [dispatch, successCreate, props.history, product]);

  const onFinish = (values) => {
    dispatch(createProduct({ ...values, images }));
  };

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(productValues);
  }, [productValues, form]);

  return (
    <div className="dashboard__product-form">
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="row">
          <div className="col-md-8">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input Name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="brand"
              label="Brand"
              rules={[{ required: true, message: 'Please input Brand!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please input Price!' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item name="salePrice" label="Sale Price">
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="countInStock"
              label="Count In Stock"
              rules={[{ required: true, message: 'Please input Count In Stock!' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please input Description!' }]}
            >
              <Input.TextArea rows={8} />
            </Form.Item>
          </div>

          <div className="col-md-4">
            <Form.Item label="Status">
              <Form.Item name="isNew" valuePropName="checked" noStyle>
                <Checkbox>Product New</Checkbox>
              </Form.Item>
              <Form.Item name="isTop" valuePropName="checked" noStyle>
                <Checkbox>Product Top</Checkbox>
              </Form.Item>
            </Form.Item>
            {loadingCategory ? (
              <div className="text-center">
                <Spin />
              </div>
            ) : errorCategory ? (
              <MessageBox variant="danger">{errorCategory}</MessageBox>
            ) : (
              <Form.Item name="categories" label="Category">
                <TreeSelect
                  treeDefaultExpandAll
                  multiple
                  placeholder="Please select"
                  treeData={arrayToTree(changeArray(categories))}
                />
              </Form.Item>
            )}
            <Form.Item name="images" label="Images">
              <FileUpload images={images} setImages={setImages} />
            </Form.Item>
            <Form.Item>
              <Button
                className="float-right"
                type="primary"
                htmlType="submit"
                loading={loadingCreate}
              >
                Create
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default ProductAddEditScreen;
