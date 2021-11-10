import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/Features/MessageBox';
import { deleteOrder, listOrders } from '../redux/actions/orderActions';
import { ORDER_DELETE_RESET } from '../redux/constants/orderConstants';
import { addKeyToObject } from '../utils';

function OrderListScreen(props) {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, paginations } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: ORDER_DELETE_RESET });
    }
    dispatch(listOrders({}));
  }, [dispatch, successDelete]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const handleTableChange = (pagination) => {
    dispatch(listOrders({ pageSize: 10, page: pagination.current }));
  };

  const handleDelete = (orderId) => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(deleteOrder(orderId));
  };

  const handleEdit = (slug) => {
    
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '',
      key: '_id',
      ellipsis: true,
      render: (order) => <Link to={`/user/order/${order._id}`}>{order._id}</Link>,
    },
    {
      title: 'USER',
      dataIndex: 'user',
      key: 'user',
      render: (user) => <span>{user.name}</span>,
    },
    {
      title: 'DATE',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => <span>{createdAt.substring(0, 10)}</span>,
    },
    {
      title: 'TOTAL',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => <span>{totalPrice.toFixed(2)}</span>,
    },
    {
      title: 'PAID',
      dataIndex: '',
      key: 'isPaid',
      render: (order) => {
        return order.isPaid ? (
          <Tag color="green">{order.paidAt.substring(0, 10)}</Tag>
        ) : (
          <Tag color="red">No</Tag>
        );
      },
    },
    {
      title: 'DELIVERED',
      dataIndex: '',
      key: 'isDelivered',
      render: (order) => {
        return order.isDelivered ? (
          <Tag color="green">{order.deliveredAt.substring(0, 10)}</Tag>
        ) : (
          <Tag color="red">No</Tag>
        );
      },
    },
    {
      title: 'ACTIONS',
      dataIndex: '',
      key: 'action',
      render: (order) => (
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(order._id)}>
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
            // onClick={() => handleEdit(category.slug)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="dashboard__order-list">
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      <Table
        dataSource={addKeyToObject(orders)}
        columns={columns}
        rowSelection={rowSelection}
        pagination={paginations}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default OrderListScreen;
