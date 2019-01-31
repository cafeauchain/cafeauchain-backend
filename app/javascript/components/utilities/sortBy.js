const sortBy = ({ collection, id, sorts = [] }) => {
    /*  The sorts param allows you to define the multiple sorting fields and the direction
        It is an array of objects structured like this:
            [{ name: "PrimarySort", desc: true }, { name: "SecondarySort" }]

        The id param is a fallback for ties. Or if the sorts is left blank, its the default
    */

    const checkForNumber = field => {
        const firstWithValue = collection.find(
            item => !(item[field] === undefined || item[field] === null || item[field] === "")
        );
        if (!firstWithValue) return false;
        const value = firstWithValue[field];
        const numRegEx = RegExp("^[0-9.,$]+$");
        return numRegEx.test(value);
    };

    if (!sorts.length) {
        const isNumber = checkForNumber(id);
        return collection.sort((a, b) => {
            const aid = a[id];
            const bid = b[id];
            if (isNumber) {
                return aid - bid;
            }
            if (aid < bid) {
                return -1;
            } else if (aid > bid) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    return collection.sort((a, b) => {
        let sortsLength = sorts.length;
        let ret = 0;
        for (let i = 0; i < sortsLength; i++) {
            let item = sorts[i];
            let aVal = a[item.name];
            let bVal = b[item.name];
            const isNumber = checkForNumber(item.name);
            if (isNumber) {
                ret = item.desc ? bVal - aVal : aVal - bVal;
                break;
            }
            if (aVal < bVal) {
                ret = item.desc ? 1 : -1;
                break;
            } else if (aVal > bVal) {
                ret = item.desc ? -1 : 1;
                break;
            } else {
                if (sorts[sortsLength - 1].name !== id) {
                    if (a[id] < b[id]) {
                        ret = 1;
                        break;
                    } else if (a[id] > b[id]) {
                        ret = -1;
                        break;
                    }
                }
            }
        }
        return ret;
    });
};

export default sortBy;
