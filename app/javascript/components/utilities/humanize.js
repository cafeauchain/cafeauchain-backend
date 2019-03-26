const humanize = (str, caps) => {
    if( caps ){
        return str.split(/(?=[A-Z])/).join(" ");
    }
    return str
        .replace(/^[\s_]+|[\s_]+$/g, '')
        .replace(/[_\s]+/g, ' ')
        .replace(/^[a-z]/, function(m) { return m.toUpperCase(); });
};

export default humanize;