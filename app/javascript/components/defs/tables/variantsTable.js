/* eslint-disable */
import { Money, AsNumber, Truncate, Weights } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "product_title", namespace: "attributes" },
        { name: "bag_size", namespace: "attributes", formatter: Weights },
        {
            name: "price_in_cents",
            namespace: "attributes",
            formatter: props => Money({ ...props, asCents: true }),
            label: "Price"
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
