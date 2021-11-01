import React from 'react';
import { useDispatch } from 'react-redux';
import { signout } from '../../../redux/actions/userActions';

function UserSignout(props) {
  const dispatch = useDispatch();

  const signoutHandler = (e) => {
    e.preventDefault();

    dispatch(signout());
  };
  return (
    <div className="account-signout">
      <p>Are you sure sign out?</p>
      <button className="btn btn-primary mt-1" onClick={signoutHandler}>
        Sign Out
      </button>
    </div>
  );
}

export default UserSignout;
