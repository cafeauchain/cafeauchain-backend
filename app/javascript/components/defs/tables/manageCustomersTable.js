/* eslint-disable */
import { AsNumber, PosMoney } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "name", namespace: "attributes/owner" },
        { name: "email", namespace: "attributes/owner" },
        { name: "terms", namespace: "attributes" },
        { name: "order_count", namespace: "attributes", formatter: AsNumber, textAlign: "right" },
        {
            name: "order_value",
            namespace: "attributes",
            formatter: PosMoney,
            textAlign: "right"
        }
    ],
    props: {
        striped: true,
        selectable: true,
        singleLine: true,
        sortable: true
    }
};

export default tableDefinition;
