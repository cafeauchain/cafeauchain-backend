// eslint-disable-next-line
import { namespacer } from "utilities";

const sortBy = ({ collection, id, sorts = [], namespace }) => {
    /*  The sorts param allows you to define the multiple sorting fields and the direction
        It is an array of objects structured like this:
            [{ name: "PrimarySort", desc: true }, { name: "SecondarySort" }]

        The id param is a fallback for ties. Or if the sorts is left blank, its the default
    */
    const getValue = (item, field) => (namespace ? namespacer(namespace, item)[field] : item[field]);

    const checkForNumber = field => {
        const firstWithValue = collection.find(item => {
            const val = getValue(item, field);
            return !(val === undefined || val === null || val === "");
        });
        if (!firstWithValue) return false;
        const value = firstWithValue[field];
        const numRegEx = RegExp("^[0-9.,$]+$");
        return numRegEx.test(value);
    };

    if (!sorts.length) {
        const isNumber = checkForNumber(id);
        return collection.sort((a, b) => {
            let aid = getValue(a, id);
            let bid = getValue(b, id);
            if (isNumber) {
                return aid - bid;
            }
            aid = typeof aid === "string" ? aid.toLowerCase() : aid;
            bid = typeof bid === "string" ? bid.toLowerCase() : bid;
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
        const sortsLength = sorts.length;
        let ret = 0;
        for (let i = 0; i < sortsLength; i++) {
            const item = sorts[i];
            let aVal = getValue(a, item.name);
            let bVal = getValue(b, item.name);
            const isNumber = checkForNumber(item.name);
            if (isNumber) {
                ret = item.desc ? bVal - aVal : aVal - bVal;
                break;
            }
            aVal = typeof aVal === "string" ? aVal.toLowerCase() : aVal;
            bVal = typeof bVal === "string" ? bVal.toLowerCase() : bVal;
            if (aVal < bVal) {
                ret = item.desc ? 1 : -1;
                break;
            } else if (aVal > bVal) {
                ret = item.desc ? -1 : 1;
                break;
            } else {
                if (sorts[sortsLength - 1].name !== id) {
                    const aid = getValue(a, id);
                    const bid = getValue(b, id);
                    if (aid < bid) {
                        ret = 1;
                        break;
                    } else if (aid > bid) {
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
