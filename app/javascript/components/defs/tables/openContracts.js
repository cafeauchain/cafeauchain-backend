/* eslint-disable */
import { Money, AsNumber } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "crop_name", namespace: "attributes", label: "Crop Name (Harvest Year)", width: 8 },
        { name: "on_hand", namespace: "attributes", formatter: AsNumber, label: "In House" },
        { name: "pounds_of_coffee", namespace: "attributes", formatter: AsNumber, label: "On Contract" },
        { name: "total_amount_roasted", namespace: "attributes", formatter: AsNumber, label: "Roasted" },
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
