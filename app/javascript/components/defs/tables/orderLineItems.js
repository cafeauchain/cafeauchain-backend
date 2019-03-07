/* eslint-disable */
import { AsNumber, Time, Weights, Money } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "name", label: "Product" },
        { name: "quantity", textAlign: "right" },
        { name: "size", formatter: Weights, textAlign: "right" },
        { name: "unit_price", label: "Unit Price", formatter: Money, textAlign: "right" },
        {
            name: "total_price",
            label: "Total",
            formatter: props => Money({ ...props, type: "positive" }),
            textAlign: "right"
        }
    ],
    props: {
        striped: true,
        selectable: true
    }
};

export default tableDefinition;
