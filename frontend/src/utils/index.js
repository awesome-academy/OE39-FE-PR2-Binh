export const addKeyToObject = (array) => {
  return array?.map((obj) => ({
    key: obj._id,
    ...obj,
  }));
};

export const arrayToTree = (arr = []) => {
  let map = {},
    node,
    res = [],
    i;
  for (i = 0; i < arr.length; i += 1) {
    map[arr[i].value] = i;
    arr[i].children = [];
  }
  for (i = 0; i < arr.length; i += 1) {
    node = arr[i];
    if (node.parent !== null) {
      arr[map[node.parent]].children.push(node);
    } else {
      res.push(node);
    }
  }
  return res;
};

export const changeArray = (arr) => {
  let arrNew = [];
  for (let i = 0; i < arr?.length; i++) {
    const item = {
      value: arr[i]._id,
      title: arr[i].name,
      parent: arr[i].parent,
    };
    arrNew.push(item);
  }
  return arrNew;
};
