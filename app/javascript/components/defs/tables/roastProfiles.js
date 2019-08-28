/* eslint-disable */
import { AsNumber } from "shared/textFormatters";
/* eslint-enable */

const TwoDecimals = props => AsNumber({ ...props, decimals: 2 });

const tableDefinition = {
    fields: [
        { name: "name", namespace: "attributes" },
        { name: "lot_name", namespace: "attributes" },
        { name: "roast_size", namespace: "attributes", formatter: AsNumber, textAlign: "right", label: "Size" },
        { 
            name: "shrinkage", 
            label: "Shrinkage (%)", 
            namespace: "attributes", 
            formatter: TwoDecimals, 
            textAlign: "right"
        }, 
        {
            name: "quantity",
            namespace: "attributes",
            formatter: TwoDecimals,
            label: "On Hand",
            textAlign: "right"
        },
        { name: "par_level", namespace: "attributes", formatter: AsNumber, textAlign: "right" },
    ],
    props: {
        celled: true
    }
};

export default tableDefinition;
