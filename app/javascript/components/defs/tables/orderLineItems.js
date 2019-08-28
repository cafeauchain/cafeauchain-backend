/* eslint-disable */
import { AsNumber, Time, Weights, Money } from "shared/textFormatters";
import { humanize } from "utilities";
/* eslint-enable */

const Humanize = props => humanize(props.content.toString());

const tableDefinition = {
    fields: [
        { name: "quantity" },
        { name: "name", label: "Product" },
        { name: "production_options", label: "Options", formatter: Humanize },
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
        singleLine: false
    }
};

export default tableDefinition;
