const abbreviator = (val, exclude, includeTheExclude = false) => {
    const arr = val.split(" ");
    return arr.reduce((abbr, string) => {
        let char = string.charAt(0).toUpperCase();
        if (exclude && exclude.test(string)) {
            char = includeTheExclude ? " " + string : "";
        }
        return abbr.toString() + char;
    }, "");
};

export default abbreviator;
