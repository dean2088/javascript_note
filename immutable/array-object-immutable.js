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

/*
* filter object with Array.prototype.reduce
*/

const state = {
    id: 1,
    points: 100,
    name: "Goran"
};

const newState = {
    ...state,
    points: 120
}

const items = {
  1: {
    id: 1,
    name: "Goran"
  }, 
  2: {
    id: 2,
    name: "Petar"
  }
};

const filterId = 1;

const filteredItems = Object.keys(items).reduce( (accumulator, key) => (
   items[key].id === filterId ? accumulator : {
       ...accumulator,
       [key]: items[key]
   }                                        
), {});

console.log(filteredItems);
/*
  {
    2: {
      id: 2,
      name: "Petar"
    }
  }
  }
*/

/*
* reduce
*/

/*
* update array with objects using Array.prototype.slice
*/

var state = [
  {name: "Goran"},
  {name: "Peter"}
]

// you can use es6 Array.prototype.findIndex to find index of the object
// let index = state.findIndex(({name}) => name === "Peter");
var index = 1;
var field = 'name';
var value = 'Zika';

var newState = [
  ...state.slice(0, index),
  {
    ...state[index],
    [field]: value
  },
  ...state.slice(index + 1)
];

console.log(newState);
/*
  [
    {name: "Goran"},
    {name: "Zika"}
  ]
*/
