import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { listOrderMine } from '../../../redux/actions/orderActions';
import MessageBox from '../../Features/MessageBox';
import OrderHistorySkeleton from '../../Features/Skeleton/OrderHistorySkeleton';

function OrderHistory(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const orderMine = useSelector((state) => state.orderMine);
  const { loading, error, orders } = orderMine;

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div className="order-history">
      {loading ? (
        <OrderHistorySkeleton />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : orders.length === 0 ? (
        <MessageBox>You have no order</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">DATE</th>
              <th scope="col">TOTAL</th>
              <th scope="col">PAID</th>
              <th scope="col">DELIVERED</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    <div className="bg-success text-white text-center">
                      {order.paidAt.substring(0, 10)}
                    </div>
                  ) : (
                    <div className="bg-danger text-white text-center">No</div>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <div className="bg-success text-white text-center">
                      {order.deliveredAt.substring(0, 10)}
                    </div>
                  ) : (
                    <div className="bg-danger text-white text-center">No</div>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => {
                      history.push(`/user/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
