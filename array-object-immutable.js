/**
 * array
**/
const list = [0, 10, 100];

const addCounter = (list) => {
  //es5
  return list.concat([0]);
  //es6
  return [...list, 0];
}

const removeCounter = (list, index) => {
  //es5
  return list.slice(0, index).concat(list.slice(index + 1));
  //es6
  return [...list.slice(0, index), ...list.slice(index + 1)];
}
//plus one 
const incrementCounter = (list, index) => {
  //es5
  return list.slice(0, index).concat(list[index] + 1).concat(list.slice(index + 1));
  //es6
  return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)];
}

/**
 * object
**/
const obj = {
  id: 1,
  text: 'text',
  completed: true
};

const updateObject = (oldObject, newObject) => {
  //es6
  return Object.assign({}, oldObject, newObject);
  //es7
  return { ...oldObject, ...newObject }
}

