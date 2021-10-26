import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Breadcrumb from '../components/Features/Breadcrumb';
import LoadingBox from '../components/Features/LoadingBox';
import MessageBox from '../components/Features/MessageBox';
import { resetPassword, forgotPassword } from '../redux/actions/userActions';
import {
  USER_CHANGE_PASSWORD_RESET,
  USER_FORGOT_PASSWORD_RESET,
} from '../redux/constants/userConstants';
import handleError from '../utils/handleError';

const initForgotData = {
  email: {
    value: '',
    error: '',
  },
};

const initPasswordData = {
  password: {
    value: '',
    error: '',
  },
  confirmPassword: {
    value: '',
    error: '',
  },
};

function ForgotPassword(props) {
  const [forgotData, setForgotData] = useState(initForgotData);
  const [passwordData, setPasswordData] = useState(initPasswordData);
  const [message, setMessage] = useState('');

  const { search } = props.location;
  let { token } = queryString.parse(search);
  const isForgot = !token;

  const dispatch = useDispatch();
  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { loading, error, success } = userForgotPassword;

  const userChangePassword = useSelector((state) => state.userChangePassword);
  const { loading: loadingChange, error: errorChange, success: successChange } = userChangePassword;

  useEffect(() => {
    if (success) {
      setMessage('Email sent successfully');
      dispatch({ type: USER_FORGOT_PASSWORD_RESET });
    }

    if (successChange) {
      setMessage('Password reseted successfully');
      dispatch({ type: USER_CHANGE_PASSWORD_RESET });
    }
  }, [dispatch, success, successChange]);

  const isValidate = useMemo(() => {
    for (let key in forgotData) {
      const error = forgotData[key].error;
      if (error !== '') return false;
    }

    return true;
  }, [forgotData]);

  function changeValueHandler(e) {
    const { name, value } = e.target;
    const password = passwordData.password.value;
    const error = handleError(name, value, password);

    if (isForgot) {
      setForgotData({
        ...forgotData,
        [name]: {
          value,
          error,
        },
      });
    } else {
      setPasswordData({
        ...passwordData,
        [name]: {
          value,
          error,
        },
      });
    }
  }

  function handleForgot(e) {
    e.preventDefault();

    if (!isValidate) {
      toast.info('Invalid input information');
      return;
    }

    if (isForgot) {
      dispatch(forgotPassword(forgotData.email.value));
      setForgotData(initForgotData);
    } else {
      dispatch(resetPassword({ password: passwordData.password.value, token }));
      setPasswordData(initPasswordData);
    }
  }

  const breadcrumb = [
    { title: 'Home', href: '/' },
    { title: 'Forgot Password', href: '/forgot' },
  ];
  return (
    <div className="main">
      <div className="container">
        <Breadcrumb breadcrumb={breadcrumb} />
      </div>

      <div
        className="forgot pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
        style={{ backgroundImage: 'url(images/login-bg.jpg)' }}
      >
        <div className="container">
          <div className="form-box">
            <div className="form-tab">
              <h3 className="text-center">Please Enter Your Infomation</h3>
              <form className="form-forgot mt-2" onSubmit={handleForgot}>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {errorChange && <MessageBox variant="danger">{errorChange}</MessageBox>}
                {message && <MessageBox variant="success">{message}</MessageBox>}
                {isForgot ? (
                  <div className="form-group">
                    <label htmlFor="email">Email address *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={forgotData.email.value}
                      onChange={changeValueHandler}
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />

                    {forgotData.email.error && (
                      <small className="form-text text-danger">{forgotData.email.error}</small>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="password">Password *</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={passwordData.password.value}
                        onChange={changeValueHandler}
                        placeholder="Enter Password"
                      />

                      {passwordData.password.error && (
                        <small className="form-text text-danger">
                          {passwordData.password.error}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password *</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword.value}
                        onChange={changeValueHandler}
                        placeholder="Enter confirm password"
                      />

                      {passwordData.confirmPassword.error && (
                        <small className="form-text text-danger">
                          {passwordData.confirmPassword.error}
                        </small>
                      )}
                    </div>
                  </>
                )}

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <button type="submit" className="btn btn-primary">
                    {isForgot ? 'Submit' : 'Update'}
                    {(loading || loadingChange) && <LoadingBox />}
                  </button>
                  <Link to="/signin">Return Sign In?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
