const validateEmail = (email) => {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const handleError = (name, value, password) => {
  let error = '';

  if (name === 'newPassword') {
    return '';
  }

  if (value.trim().length === 0) {
    return 'Please fill in this field';
  }

  switch (name) {
    case 'email':
      if (!validateEmail(value)) error = 'Invalid email';
      else error = '';
      break;
    case 'password':
      if (value.length < 6) error = 'Password is too short';
      else error = '';
      break;
    case 'confirmPassword':
      if (value !== password) error = 'Repassword does not match';
      else error = '';
      break;
    default:
      break;
  }

  return error;
};

export default handleError;
