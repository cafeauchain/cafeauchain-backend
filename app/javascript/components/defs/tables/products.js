/* eslint-disable */
import { Money, AsNumber, Truncate, ArrayToString, LongText } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "title", namespace: "attributes" },
        {
            name: "description",
            namespace: "attributes",
            formatter: props => Truncate({ ...props, style: { maxWidth: 400 } }),
            width: 6
        },
        {
            name: "composition",
            namespace: "attributes",
            formatter: props =>
                ArrayToString({ ...props, keys: ["name", "pct"], output: array => array.join(": ") + "%" })
        }
    ],
    props: {
        celled: true,
        striped: true,
        selectable: true,
        singleLine: true
    }
};

export default tableDefinition;
