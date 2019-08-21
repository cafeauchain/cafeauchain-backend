const paramatize = string => {
    if( !string ){
        return {};
    }
    const params = string.slice(1).split("&");
    const json = {};
    for (const key of params) {
        let i = key.split("=");
        json[i[0]] = isNaN(i[1]) ? decodeURIComponent(i[1] || "") : Number(i[1]);
    }
    return JSON.parse(JSON.stringify(json));
};

export default paramatize;
