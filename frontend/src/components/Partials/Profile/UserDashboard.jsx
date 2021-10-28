import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserDashboard(props) {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <div>
      <p>
        Hello <span className="font-weight-normal text-dark">{userInfo.name}</span>
        <br />
        From your account dashboard you can view your{' '}
        <Link to="#tab-orders" className="link-underline">
          recent orders
        </Link>
        , manage your <Link to="#tab-address">shipping and billing addresses</Link>, and{' '}
        <Link to="#tab-account">edit your password and account details</Link>.
      </p>
    </div>
  );
}

export default UserDashboard;
