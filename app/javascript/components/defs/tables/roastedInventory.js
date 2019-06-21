/* eslint-disable */
import { AsNumber } from "shared/textFormatters";
/* eslint-enable */

const TwoDecimals = props => AsNumber({ ...props, decimals: 2 });

const tableDefinition = {
    fields: [
        { name: "name", namespace: "attributes" },
        { name: "lot_name", namespace: "attributes" },
        {
            name: "quantity",
            namespace: "attributes",
            formatter: TwoDecimals,
            label: "Amount Available (lbs)",
            textAlign: "right"
        },
        { 
            name: "quantity_needed", 
            namespace: "attributes", 
            formatter: TwoDecimals, 
            label: "Amount Needed for Open Orders" 
        },
        {
            name: "amount_to_roast",
            namespace: "attributes",
            formatter: TwoDecimals
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
