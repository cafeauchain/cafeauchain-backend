const flatObject = obj => {
    const keys = Object.keys(obj);

    return keys.reduce((acc, key) => {
        const value = obj[key];
        if( !value ){
            return {...acc, [key]: value};
        }

        return typeof value === 'object' ?
            { ...acc, ...flatObject(value) } :
            { ...acc, [key]: value };
    }, {});
};

export default flatObject;