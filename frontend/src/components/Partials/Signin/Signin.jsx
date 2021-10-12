import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../../redux/actions/userActions';
import handleError from '../../../utils/handleError';

const initSignInData = {
  email: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
};

function Signin(props) {
  const [signInData, setSignInData] = useState(initSignInData);

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error } = userSignin;

  const isValidate = useMemo(() => {
    for (let key in signInData) {
      const error = signInData[key].error;
      if (error !== '') return false;
    }

    return true;
  }, [signInData]);

  function changeValueHandler(e) {
    const { name, value } = e.target;
    const error = handleError(name, value);

    setSignInData({
      ...signInData,
      [name]: {
        value,
        error,
      },
    });
  }

  function handleSignIn(e) {
    e.preventDefault();

    if (!isValidate) {
      toast.info('Invalid email or password');
      return;
    }

    const user = {
      email: signInData.email.value,
      password: signInData.password.value,
    };

    dispatch(signin(user));
    setSignInData(initSignInData);
  }

  return (
    <form className="form-signin mt-2" onSubmit={handleSignIn}>
      {error && <p className="progress-bar bg-danger p-1 mb-2">{error}</p>}
      <div className="form-group">
        <label htmlFor="email">Email address *</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={signInData.email.value}
          onChange={changeValueHandler}
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />

        {signInData.email.error && (
          <small className="form-text text-danger">{signInData.email.error}</small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={signInData.password.value}
          onChange={changeValueHandler}
          placeholder="Password"
        />

        {signInData.password.error && (
          <small className="form-text text-danger">{signInData.password.error}</small>
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button type="submit" className="btn btn-primary">
          Sign In
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
        <a href="/">Forgot Your Password?</a>
      </div>
    </form>
  );
}

export default Signin;
