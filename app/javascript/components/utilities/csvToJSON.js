const processData = data => {
    var rows, headers;
    rows = data.split(/\r\n|\n/);
    headers = rows[0].split(",");
    let json = [];
    for (var i = 1; i < rows.length; i++) {
        if (rows[i] !== "") {
            var object, cols;
            object = {};
            cols = rows[i].split(",");
            for (var x = 0; x < cols.length; x++) {
                object[headers[x]] = cols[x];
            }
            json.push(object);
        }
    }
    return json;
};

export default processData;
