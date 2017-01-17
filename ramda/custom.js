(function () {
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function () {   

      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
        } else {
            logger.innerHTML += arguments[i] + ' ';
        } 
      }

      logger.innerHTML += '<br/>'
    }
})();

//closer: you have a function to return a function to return a function
var addThree = (a) => (b) => (c) => a+b+c;
console.log('you have a function to return a function to return a function:',addThree(1)(2)(3));

var hasOneNeedsTwoMore = addThree(1)
console.log(hasOneNeedsTwoMore(2)(3))

//
var addThreeR = R.curry((a,b,c) => a + b + c);
console.log(addThreeR(1)(2)(3),addThreeR(1,2)(3),addThreeR(1)(2,3),addThreeR(1,2,3))
console.log('=====================================================================')

var f = (x) => x + 1
var g = (x) => x * 5

console.log(f(g(1)),g(f(1)))
console.log('========================compose-pipe=================================')
console.log(R.compose(f,g)(1),R.compose(g,f)(1));
console.log(R.pipe(f,g)(1),R.pipe(g,f)(1));

var isEven = (x) => x % 2 === 0
var multiplyEvens = R.pipe(
        R.filter(isEven),
        R.reduce(R.multiply,1)
    );
console.log(multiplyEvens(R.range(1,5)))

console.log('========================example-object================================')

const testData = [{
        isActive: false,
        balance: "$2,006.43",
        age: 14,
        name: {
            first: "Marcie",
            last: "Rollins"
        },
        email: "marcie.rollins@isosure.me",
        tags: [
            "ex",
            "proident",
            "ad",
            "aliqua",
            "custom_tag"
        ]
    },{
        isActive: true,
        balance: "$3,661.55",
        age: 20,
        name: {
            first: "Janie",
            last: "Donaldson"
        },
        email: "janie.donaldson@interloo.biz",
        tags: [
            "dolor",
            "cool",
            "job",
            "aliqua",
            "time"
        ]
    },{
        isActive: true,
        balance: "$5,003.43",
        age: 40,
        name: {
            first: "Tim",
            last: "Grace"
        },
        email: "tim.grace@isosure.me",
        tags: [
            "ex",
            "fun",
            "ad",
            "time",
            "custom_tag"
        ]
    },{
        isActive: false,
        balance: "$3,336.43",
        age: 30,
        name: {
            first: "Piter",
            last: "Jane"
        },
        email: "piter.jane@isosure.me",
        tags: [
            "ex",
            "proident",
            "ad",
            "good",
            "custom_tag"
        ]
    },{
        isActive: true,
        balance: "$4,006.43",
        age: 35,
        name: {
            first: "Tom",
            last: "Brown"
        },
        email: "tom.brown@isosure.me",
        tags: [
            "dolor",
            "proident",
            "ad",
            "aliqua",
            "custom_tag"
        ]
    }]

//console.log(data)
console.log("first name of isActive = true and age > 30 ")

var isActive = R.propEq('isActive', true);
var overThirty = R.pipe(
        R.prop('age'),
        (age) => age > 30 
    );

var activeOverThirty = R.pipe(
        R.filter(R.both(isActive, overThirty)),
        R.map(R.path(['name','first']))
    )
console.log(activeOverThirty(testData))

console.log("reject any with excluded tags")

var excludedTags = ['proident']

var isExcludedTag = (tag) => R.any(R.equals(tag), excludedTags);
var filterExcludedTags = R.reject(
        R.pipe(
            R.prop('tags'),
            R.tap(console.log),
            R.any(isExcludedTag)
        )
    );
//R.tap(console.log), print the current result
console.log(filterExcludedTags(testData).length)

console.log("send an email to everybody")

var makeEmailHref = R.pipe(
        R.map(R.prop('email')),
        R.join(';'),
        R.concat('mailto:')
    )
console.log(makeEmailHref(testData))

console.log('all possible sums')

var allPossibleSums = R.lift((a, b, c) => a + b + c)

var result = allPossibleSums(
        [1,2],[4,5],[7,8]
    )

console.log(result)
console.log('========================encode-data================================')
var inputs = [
    'If man was meant to stay on the ground, God would have given us roots.',
    'Have a nice day!',
    'Feed the dog.',
    'CHILL OUT!!!'
]

var outputs = [
    'imtgdvs fearwer mayoogo anouuio ntnnlvt wttddes aohghn sseoau',
    'hae and via ecy',
    'fto ehg ee dd',
    'cl ho iu lt'
]

var cleanInput = R.pipe(R.toLower, R.replace(/[\s.,!]/g,''))
console.log(cleanInput('HELLO!! ....,.'))

//rows = floor of square root of length
//columns = seiling of length / rows

var determineNumberOfColumns = (input) => {
    var length = input.length;
    var columnsFor = R.pipe(
            Math.sqrt,
            R.tap(console.log),
            Math.floor,
            R.divide(length),
            Math.ceil
        )
    return columnsFor(length)
}

var checkColumns = R.map(R.pipe(cleanInput,determineNumberOfColumns));
console.log(checkColumns(inputs))

var input = 'haveaniceday';

var turnIntoSquare = (columns) => R.splitEvery(columns)

console.log(turnIntoSquare(4)(input))

var squareWithUnevenRows = ['feed','thed','og']

var fillSquare = (columns) => R.map(
        R.ifElse(
            R.pipe(R.length, R.equals(columns)),
            R.identity,
            (row) => {
                var fillSpaces = R.pipe(
                        R.length,
                        R.subtract(columns),
                        R.times(R.always(' ')),
                        R.join(''),
                        R.concat(row)
                        
                    )
                return fillSpaces(row);
            }
        )
    );

console.log(fillSquare(4)(squareWithUnevenRows))

var square = [
        'have','anic','eday'
    ];

var transposeSquare = R.converge(
        R.reduce((acc,row) => {
            var flattenAndTrim = R.pipe(R.flatten,R.join(''), R.trim);
            var zipWithAcc = R.pipe(
                R.zip(acc),
                R.map(flattenAndTrim)
            );
            return zipWithAcc(row);
        }),
        [R.pipe(R.head, R.map(R.of)), R.tail]
    )

console.log(transposeSquare(square))

console.log('==========encode inputs============:')

var encode = (input) => {

    var cleanedInput = cleanInput(input);
    var columns = determineNumberOfColumns(cleanedInput);
    var encodeInput = R.pipe(
        turnIntoSquare(columns),
        fillSquare(columns),
        transposeSquare,
        R.join(' ')
    )
    return encodeInput(cleanedInput)
}

console.log(R.map(encode,inputs));
console.log('==========decode inputs============:');

var decode = (output) => {

    var decodeOutput = R.pipe(
        R.split(' '),
        R.converge(
            R.call,
            [ R.pipe(R.head, R.length, fillSquare),
              R.identity ]
        ),
        // (row) => {
        //     var length = row[0].length;
        //     return fillSquare(length)(row);
        // },
        transposeSquare,
        R.join(' ')
    )
    return decodeOutput(output);
}

console.log(R.map(decode,outputs));

console.log('==================================:');
console.log('==================================:');






















