/* eslint-disable */
import { AsNumber } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "inventory_item_name", namespace: "attributes", label: "Roast Profile" },
        { name: "lot_label", namespace: "attributes" },
        { name: "starting_amount", namespace: "attributes", formatter: AsNumber, label: "Green Wt" },
        { name: "roast_date", namespace: "attributes" }
    ],
    props: {
        celled: true,
        striped: true,
        selectable: true,
        singleLine: true
    }
};

export default tableDefinition;
