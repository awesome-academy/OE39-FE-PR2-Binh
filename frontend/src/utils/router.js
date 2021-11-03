let baseUrl = `${process.env.REACT_APP_BASE_URL}`;
let apiEndPoint = `${process.env.REACT_APP_API_ENDPOINT}`;

export const renderBaseUrl = (url) => {
  if (url) {
    return `${baseUrl}/${url}`;
  }
  return baseUrl;
};

export const productDetailPath = (slug = '') => {
  return `${baseUrl}/product/${slug}`;
};

export const productApiPath = (slug = '') => {
  return `${apiEndPoint}/products/${slug}`;
};

export const userApiPath = (slug = '') => {
  return `${apiEndPoint}/users/${slug}`;
};

export const orderApiPath = (slug = '') => {
  return `${apiEndPoint}/orders/${slug}`;
};

export const uploadApiPath = (slug = '') => {
  return `${apiEndPoint}/uploads/${slug}`;
};

export const categoryApiPath = (slug = '') => {
  return `${apiEndPoint}/categories/${slug}`;
};
