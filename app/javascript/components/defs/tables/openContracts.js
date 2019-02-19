/* eslint-disable */
import { Money, AsNumber } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "name", namespace: "attributes", label: "Lot Name", width: 6 },
        { name: "crop_name", namespace: "attributes", label: "Crop Name (Harvest Year)", width: 4 },
        { name: "on_hand", namespace: "attributes", formatter: AsNumber, label: "In House" },
        { name: "in_warehouse", namespace: "attributes", formatter: AsNumber, label: "Undelivered" },
        { name: "total_amount_roasted", namespace: "attributes", formatter: AsNumber, label: "Roasted" },
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
