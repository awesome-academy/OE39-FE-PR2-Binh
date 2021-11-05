import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCategory, listCategories } from '../../../redux/actions/categoryActions';
import { addKeyToObject } from '../../../utils';
import MessageBox from '../../Features/MessageBox';
import { CATEGORY_DELETE_RESET } from '../../../redux/constants/categoryConstants';

function CategoryList(props) {
  const history = useHistory();
  const [paginations, setPaginations] = useState({
    current: 1,
    pageSize: 10,
  });
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: CATEGORY_DELETE_RESET });
    }
    dispatch(listCategories());
  }, [dispatch, successDelete]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const handleTableChange = (pagination) => {
    setPaginations({ ...pagination, current: pagination.current });
  };

  const handleDelete = (slug) => {
    dispatch(deleteCategory(slug));
  };

  const handleEdit = (slug) => {
    history.push(`/admin/categories?edit=${slug}`);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <Link to={`/${name}`}>{name}</Link>,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
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
    <div className="dashboard__category-list">
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      <Table
        dataSource={addKeyToObject(categories)}
        columns={columns}
        rowSelection={rowSelection}
        pagination={paginations}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default CategoryList;
