/* eslint-disable */
import { Money, AsNumber } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "name", namespace: "attributes" },
        { name: "lot_name", namespace: "attributes" },
        {
            name: "quantity",
            namespace: "attributes",
            formatter: AsNumber,
            label: "Pounds Available",
            textAlign: "right"
        },
        { name: "par_level", namespace: "attributes", formatter: AsNumber, textAlign: "right" }
    ],
    props: {
        celled: true,
        striped: true,
        selectable: true,
        singleLine: true
    }
};

export default tableDefinition;
