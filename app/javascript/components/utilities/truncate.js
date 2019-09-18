const truncate = (str, len, useElipsis = true) => {
    const elip = useElipsis ? "..." : "";
    return typeof str === "string" && str.length > len ? str.slice(0, len) + elip : str;
};
export default truncate;
