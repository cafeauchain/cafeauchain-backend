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
            label: "Pounds Available",
            textAlign: "right"
        },
        { name: "par_level", namespace: "attributes", formatter: AsNumber, textAlign: "right" },
        { name: "roast_size", namespace: "attributes", formatter: TwoDecimals, textAlign: "right" },
        { 
            name: "shrinkage", 
            label: "Skrinkage (%)", 
            namespace: "attributes", 
            formatter: TwoDecimals, 
            textAlign: "right"
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
