/* eslint-disable */
import { Money, AsNumber, Truncate, Weights } from "shared/textFormatters";
import isEditable from "shared/textFormatters/isEditable";
/* eslint-enable */

const onSubmit = {
    url: "/products/",
    method: "PUT",
    onSuccess: { requests: ["variants", "products"] },
    onError: []
};

const tableDefinition = {
    fields: [
        { name: "product_title", namespace: "attributes" },
        { name: "bag_size", namespace: "attributes", formatter: Weights },
        {
            name: "price_in_dollars",
            namespace: "attributes",
            formatter: isEditable(props => Money({ ...props }), onSubmit),
            label: "Price"
        }
    ],
    props: {
        celled: true,
        striped: true,
        selectable: true,
        singleLine: true,
        sortable: true
    }
};

export default tableDefinition;
