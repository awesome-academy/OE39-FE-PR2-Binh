export const addKeyToObject = (array) => {
  return array?.map((obj) => ({
    key: obj._id,
    ...obj,
  }));
};

export const arrayToTree = (arr = [], key = 'value') => {
  let map = {},
    node,
    res = [],
    i;
  for (i = 0; i < arr.length; i += 1) {
    map[arr[i][key]] = i;
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

export const changeArray = (arr, key = 'value') => {
  let arrNew = [];
  for (let i = 0; i < arr?.length; i++) {
    const item = {
      [key]: arr[i]._id,
      title: arr[i].name,
      parent: arr[i].parent,
    };
    arrNew.push(item);
  }
  return arrNew;
};

export const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },

  {
    name: '3stars & up',
    rating: 3,
  },

  {
    name: '2stars & up',
    rating: 2,
  },

  {
    name: '1stars & up',
    rating: 1,
  },
];
