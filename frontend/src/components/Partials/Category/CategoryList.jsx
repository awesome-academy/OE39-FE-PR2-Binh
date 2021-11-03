import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCategories } from '../../../redux/actions/categoryActions';
import { addKeyToObject } from '../../../utils';
import MessageBox from '../../Features/MessageBox';

function CategoryList(props) {
  const [paginations, setPaginations] = useState({
    current: 1,
    pageSize: 10,
  });
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const handleTableChange = (pagination) => {
    setPaginations({ ...pagination, current: pagination.current });
  };

  const handleDelete = (categoryId) => {
    console.log(categoryId);
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
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(category._id)}>
            <Button type="danger" shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div className="dashboard__category-list">
      {error && <MessageBox variant="danger">{error}</MessageBox>}
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
