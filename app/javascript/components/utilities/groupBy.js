const groupBy = (array, key) => {
    return array.reduce((obj, item) => {
        (obj[item[key]] = obj[item[key]] || []).push(item);
        return obj;
    }, {});
};

export default groupBy;