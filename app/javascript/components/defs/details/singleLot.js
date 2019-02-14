/* eslint-disable */
import { AsNumber, Money } from "shared/textFormatters";
/* eslint-enable */

const fields = [
    { name: "on_hand", formatter: AsNumber, label: "In House" },
    { name: "pounds_of_coffee", formatter: AsNumber, label: "On Contract" },
    { name: "total_amount_roasted", formatter: AsNumber, label: "Roasted" },
    {
        name: "price_per_pound",
        formatter: props => Money({ ...props, type: "positive" })
    },
    {
        name: "contract_value",
        formatter: props => Money({ ...props, type: "positive", decimals: 0 }),
        label: "Total Value"
    }
];

export default fields;
