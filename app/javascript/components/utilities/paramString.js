const createParamString = obj => {
    return Object.keys(obj).reduce((string, key, idx) => {
        let param = key + "=" + obj[key];
        const join = idx === 0 ? "?" : "&";
        return string + join + param;
    }, "");
};

export default createParamString;