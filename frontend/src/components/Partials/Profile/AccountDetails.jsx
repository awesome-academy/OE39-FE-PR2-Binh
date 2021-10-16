import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../../../redux/actions/userActions';
import LoadingBox from '../../Features/LoadingBox';
import MessageBox from '../../Features/MessageBox';
import AccountDetailsSkeleton from '../../Features/Skeleton/AccountDetailsSkeleton';

const initUserDetailsData = {
  name: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  currentPassword: {
    value: '',
    error: '',
  },
  newPassword: {
    value: '',
    error: '',
  },
};

function AccountDetails(props) {
  const inputRef = useRef();
  const [userDetail, setUserDetail] = useState(initUserDetailsData);
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user) {
      dispatch(detailsUser(userInfo._id));
    } else {
      setUserDetail({
        ...initUserDetailsData,
        name: {
          value: user.name,
          error: '',
        },
        email: {
          value: user.email,
          error: '',
        },
      });
      setProfilePicUrl(user.avatar);
    }
  }, [dispatch, user, userInfo]);

  const changeValueHandler = (e) => {};

  let picUrl = avatarPreview || profilePicUrl;

  return (
    <div className="account-detail">
      {loading ? (
        <div>
          <AccountDetailsSkeleton />
        </div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="avatar">
            <img
              className={`avatar__image ${highlighted ? 'highlight' : ''}`}
              src={picUrl}
              alt="Avatar"
            />
            <span className="avatar__caption">Choose avatar</span>
          </div>
          <form className="form-account-detail mt-2">
            {error && <p className="progress-bar bg-danger p-1 mb-2">{error}</p>}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="form-control"
              id="avatar"
              name="avatar"
              style={{ display: 'none' }}
            />
            <div className="form-group">
              <label htmlFor="name">Full name *</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={userDetail.name.value}
                onChange={changeValueHandler}
                aria-describedby="nameHelp"
                placeholder="Enter full name"
              />

              {userDetail.name.error && (
                <small className="form-text text-danger">{userDetail.name.error}</small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address *</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={userDetail.email.value}
                onChange={changeValueHandler}
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />

              {userDetail.email.error && (
                <small className="form-text text-danger">{userDetail.email.error}</small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Current Password *</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={userDetail.currentPassword.value}
                onChange={changeValueHandler}
                placeholder="Enter Current Password"
              />

              {userDetail.currentPassword.error && (
                <small className="form-text text-danger">{userDetail.currentPassword.error}</small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                value={userDetail.newPassword.value}
                onChange={changeValueHandler}
                placeholder="Enter New Password"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary">
                Update
                {loading && <LoadingBox />}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default AccountDetails;
