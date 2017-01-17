exports.clone = function( source ) {
    let result = {};

    for ( var prop of Object.keys( source ) ) {
        let desc = Object.getOwnPropertyDescriptor( source, prop );
        result = Object.defineProperty( result, prop, desc );
    }

    return result;
};

exports.create = function( source ) {
    let result = {};

    for ( var prop of Object.keys( source ) ) {
        let desc = {
            value: source[ prop ],
            enumerable: true,
            writable: false,
            configurable: false
        };
        result = Object.defineProperty( result, prop, desc );
    }

    return result;
};

exports.deepCreate = function ( source ) {
    let result = {};

    for ( var prop of Object.keys( source ) ) {
        let desc = {
            enumerable: true,
            writable: false,
            configurable: false
        };

        if ( typeof( source[ prop ]) === 'Object' ) {
            desc.value = deepCreate( source[ prop ] );
        } else {
            desc.value = source[ prop ];
        }

        result = Object.defineProperty( result, prop, desc );
    }

    return result;
