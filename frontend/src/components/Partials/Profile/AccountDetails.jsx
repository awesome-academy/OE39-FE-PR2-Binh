import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { uploadImage } from '../../../redux/actions/uploadActions';
import { detailsUser, updateUserProfile } from '../../../redux/actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../../redux/constants/userConstants';
import handleError from '../../../utils/handleError';
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
  const [highlighted, setHighlighted] = useState(false);

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;

  const imageUpload = useSelector((state) => state.imageUpload);
  const { loading: loadingUpload, error: errorUpload, image } = imageUpload;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user || successUpdate) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
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
  }, [dispatch, user, userInfo, successUpdate]);

  const changeValueHandler = (e) => {
    const { name, value } = e.target;
    const error = handleError(name, value);

    setUserDetail({
      ...userDetail,
      [name]: {
        value,
        error,
      },
    });
  };

  const uploadImageHandler = (e) => {
    const files = e.target.files;
    if (files.length === 0) {
      return;
    }
    dispatch(uploadImage(files[0]));
  };

  const onDragOverHandler = (e) => {
    e.preventDefault();
    setHighlighted(true);
  };

  const onDragLeaveHandler = (e) => {
    e.preventDefault();
    setHighlighted(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    setHighlighted(true);

    const droppedFile = Array.from(e.dataTransfer.files);
    if (droppedFile.length === 0) {
      return;
    }
    dispatch(uploadImage(droppedFile[0]));
  };

  const isValidate = useMemo(() => {
    for (let key in userDetail) {
      const error = userDetail[key].error;
      if (error !== '') return false;
    }

    return true;
  }, [userDetail]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isValidate) {
      toast.info('Invalid input information');
      return;
    }

    const user = {
      name: userDetail.name.value,
      email: userDetail.email.value,
      avatar: image,
      currentPassword: userDetail.currentPassword.value,
      newPassword: userDetail.newPassword.value,
    };

    dispatch(updateUserProfile(user));
  };

  let picUrl = image || profilePicUrl;

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
          <div
            className="avatar"
            onDragOver={onDragOverHandler}
            onDragLeave={onDragLeaveHandler}
            onDrop={onDropHandler}
            onClick={() => inputRef.current.click()}
          >
            <img
              className={`avatar__image ${highlighted ? 'highlight' : ''}`}
              src={picUrl}
              alt="Avatar"
            />
            {loadingUpload && <p className="mt-1">Uploading image...</p>}
            <span className="avatar__caption">Choose avatar</span>
          </div>
          <form className="form-account-detail mt-2" onSubmit={submitHandler}>
            {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
            {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="form-control"
              id="avatar"
              name="avatar"
              onChange={uploadImageHandler}
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
              <label htmlFor="currentPassword">Current Password *</label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                name="currentPassword"
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
                {loadingUpdate && <LoadingBox />}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default AccountDetails;
