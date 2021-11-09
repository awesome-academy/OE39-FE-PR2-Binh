import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/Features/MessageBox';
import { deleteProduct, listProducts } from '../redux/actions/productActions';
import { PRODUCT_DELETE_RESET } from '../redux/constants/productConstants';
import { addKeyToObject } from '../utils';

function ProductListScreen(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, paginations } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({ pageSize: 10 }));
  }, [dispatch, successDelete]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const handleTableChange = (pagination) => {
    dispatch(listProducts({ pageSize: 10, page: pagination.current }));
  };

  const handleDelete = (slug) => {
    dispatch(deleteProduct(slug));
  };

  const handleEdit = (slug) => {
    props.history.push(`/admin/products/edit/${slug}`);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (images) => <Avatar src={images[0]} size={100} shape="square" />,
    },
    {
      title: 'Name',
      dataIndex: '',
      key: 'name',
      render: (product) => <Link to={`/product/${product.slug}`}>{product.name}</Link>,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      ellipsis: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Sale price',
      dataIndex: '',
      key: 'salePrice',
      render: (product) => {
        return product.salePrice ? <Tag color="green">{product.salePrice}</Tag> : <span>No</span>;
      },
    },
    {
      title: 'CountInStock',
      dataIndex: '',
      key: 'countInStock',
      render: (product) => {
        return product.countInStock ? (
          <span>{product.countInStock}</span>
        ) : (
          <Tag color="red">No</Tag>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (category) => (
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(category.slug)}>
            <Button
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              loading={loadingDelete}
            />
          </Popconfirm>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleEdit(category.slug)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="dashboard__product-list">
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      <Table
        dataSource={addKeyToObject(products)}
        columns={columns}
        rowSelection={rowSelection}
        pagination={paginations}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default ProductListScreen;
