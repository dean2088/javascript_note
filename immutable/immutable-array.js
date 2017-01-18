/**
 *
 * array
 *
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
//short
//arrayObject.slice(start,end), use this to copy a array
const characters = [ 'Obi-Wan', 'Vader', 'Luke' ]
const sortedCharacters = characters.slice().sort()
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