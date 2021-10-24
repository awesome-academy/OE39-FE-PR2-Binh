import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/Features/MessageBox';
import { deleteUser, listUsers } from '../redux/actions/userActions';
import { USER_DELETE_RESET } from '../redux/constants/userConstants';
import { addKeyToObject } from '../utils';

function UserListScreen(props) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users, paginations } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    }
    dispatch(listUsers({}));
  }, [dispatch, successDelete]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const handleTableChange = (pagination) => {
    dispatch(listUsers({ ...pagination, page: pagination.current }));
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleEdit = (userId) => {
    
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      ellipsis: true,
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'ADMIN',
      dataIndex: '',
      key: 'isAdmin',
      render: (user) => (user.isAdmin ? <Tag color="green">YES</Tag> : <Tag color="red">NO</Tag>),
    },
    {
      title: 'ACTIONS',
      dataIndex: '',
      key: 'action',
      render: (user) => (
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(user._id)}>
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
            onClick={() => handleEdit(user._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="dashboard__user-list">
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      <Table
        dataSource={addKeyToObject(users)}
        columns={columns}
        rowSelection={rowSelection}
        pagination={paginations}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default UserListScreen;
