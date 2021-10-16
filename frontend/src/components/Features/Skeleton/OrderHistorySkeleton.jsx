import React from 'react';
import Skeleton from 'react-loading-skeleton';

function OrderHistorySkeleton(props) {
  return (
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
        {[1, 2, 3].map((index) => (
          <tr key={index}>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <td key={index}>
                <Skeleton height={30} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderHistorySkeleton;
