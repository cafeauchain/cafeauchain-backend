const truncate = (str, len) => {
    return typeof str === "string" && str.length > len ? str.slice(0, len) + "..." : str;
};
export default truncate;
