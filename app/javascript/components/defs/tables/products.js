/* eslint-disable */
import { Money, AsNumber, Truncate } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "title", namespace: "attributes" },
        {
            name: "description",
            namespace: "attributes",
            formatter: Truncate,
            style: { maxWidth: 200, display: "block" }
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
