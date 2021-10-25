import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signup } from '../../../redux/actions/userActions';
import handleError from '../../../utils/handleError';

const initSignUpData = {
  fullName: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
  confirmPassword: {
    value: '',
    error: '',
  },
};

function Signup(props) {
  const [signUpData, setSignUpData] = useState(initSignUpData);

  const dispatch = useDispatch();
  const userSignup = useSelector((state) => state.userSignup);
  const { loading, error } = userSignup;

  const isValidate = useMemo(() => {
    for (let key in signUpData) {
      const error = signUpData[key].error;
      if (error !== '') return false;
    }

    return true;
  }, [signUpData]);

  function changeValueHandler(e) {
    const { name, value } = e.target;
    const password = signUpData.password.value;
    const error = handleError(name, value, password);

    setSignUpData({
      ...signUpData,
      [name]: {
        value,
        error,
      },
    });
  }

  function handleSignUp(e) {
    e.preventDefault();

    if (!isValidate) {
      toast.info('Invalid input information');
      return;
    }

    const user = {
      name: signUpData.fullName.value,
      email: signUpData.email.value,
      password: signUpData.password.value,
    };

    dispatch(signup(user));
    setSignUpData(initSignUpData);
  }

  return (
    <form className="form-signup mt-2" onSubmit={handleSignUp}>
      {error && <p className="progress-bar bg-danger p-1 mb-2">{error}</p>}
      <div className="form-group">
        <label htmlFor="fullName">Full name *</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          name="fullName"
          value={signUpData.fullName.value}
          onChange={changeValueHandler}
          aria-describedby="emailHelp"
          placeholder="Enter full name"
        />

        {signUpData.fullName.error && (
          <small className="form-text text-danger">{signUpData.fullName.error}</small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address *</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={signUpData.email.value}
          onChange={changeValueHandler}
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />

        {signUpData.email.error && (
          <small className="form-text text-danger">{signUpData.email.error}</small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={signUpData.password.value}
          onChange={changeValueHandler}
          placeholder="Enter Password"
        />

        {signUpData.password.error && (
          <small className="form-text text-danger">{signUpData.password.error}</small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
          value={signUpData.confirmPassword.value}
          onChange={changeValueHandler}
          placeholder="Enter confirm password"
        />

        {signUpData.confirmPassword.error && (
          <small className="form-text text-danger">{signUpData.confirmPassword.error}</small>
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button type="submit" className="btn btn-primary">
          Sign Up
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      </div>
    </form>
  );
}

export default Signup;
