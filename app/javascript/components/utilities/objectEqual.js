// TODO Come back to this to get it working

const checkObjects = (a,b) => {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
};



const isEquivalent = (a, b) => {
    if( Array.isArray(a) ){
        return a.forEach( (item,idx) => {
            console.log( item, b[idx] );
            // checkObjects(item, b[idx]);
        });
    // } else {
    //     return checkObjects(a,b);
    }
};

export default isEquivalent;