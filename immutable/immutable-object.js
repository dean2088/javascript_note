/**
 *
 * object
 *
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
* filter or update object with Array.prototype.reduce
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
* remove a object's key with Array.prototype.reduce
*/
const person = {
  name: 'John',
  password: '123',
  age: 28
}
const newPerson = Object.keys(person).reduce((obj, key) => {
  if (key !== property) {
    return { ...obj, [key]: person[key] }
  }
  return obj
}, {})

/*
* reduce
*/
const time = {
  for: 54.965,
  while: 53.056, 
  reduce: 0.417,
}

