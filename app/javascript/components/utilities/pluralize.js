const pluralize = (val, str) => Number(val) + " " + (Number(val) > 1 ? str + "s" : str);
export default pluralize;