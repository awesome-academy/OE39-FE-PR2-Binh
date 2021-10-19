export const addKeyToObject = (array) => {
  return array?.map((obj) => ({
    key: obj._id,
    ...obj,
  }));
};
