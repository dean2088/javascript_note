const pop = (array) => array.splice(0, -1);

const push = (array, el) => [...array, el];

const splice = (array = [], startCount, deleteCount = 0, ...elements) => {
    const { length } = array;
    let remainder = startCount + deleteCount;

    if(startCount > length || startCount <= -length) {
        startCount = 0;
    } else if(startCount < 0) {
        startCount = length + startCount;
        const elementsRemain = length - startCount <= deleteCount;
        remainder = elementsRemain ? length : startCount + deleteCount; 
    }
    if(deleteCount < 0) deleteCount = 0;

    return [
        ...array.slice(0, startCount),
        ...elements,
        ...array.slice(remainder)
    ];
};

const shift = (array) => array.slice(1);

const reverse = (array) => {
    return [...array].reverse(); 
};      

export default const iam {
    pop,
    push,
    splice,
    shift,
    reverse
};