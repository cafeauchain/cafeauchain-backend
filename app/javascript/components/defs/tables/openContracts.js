/* eslint-disable */
import { Money, AsNumber } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "name", namespace: "attributes", label: "Lot Name", width: 6 },
        { name: "on_hand", namespace: "attributes", formatter: AsNumber, label: "On Hand" },
        { name: "low_on_hand", namespace: "attributes", formatter: AsNumber, label: "On Hand Par Level" },
        { name: "in_warehouse", namespace: "attributes", formatter: AsNumber, label: "Warehouse" },
        { name: "low_remaining", namespace: "attributes", formatter: AsNumber, label: "Warehouse Par Level" },
        { name: "pounds_of_coffee", namespace: "attributes", formatter: AsNumber, label: "Total Contract" },
        {
            name: "price_per_pound",
            namespace: "attributes",
            formatter: props => Money({ ...props, type: "positive" }),
            label: "$/lb"
        },
        {
            name: "contract_value",
            namespace: "attributes",
            formatter: props => Money({ ...props, type: "positive", decimals: 0 }),
            label: "Total Value"
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
