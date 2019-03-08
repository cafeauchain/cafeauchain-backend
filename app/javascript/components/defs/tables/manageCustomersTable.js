/* eslint-disable */
import { AsNumber, PosMoney } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "company_name", label: "Company", namespace: "attributes" },
        { name: "name", label: "Primary Contact", namespace: "attributes/owner" },
        { name: "email", label: "Contact Email", namespace: "attributes" },
        { name: "terms", namespace: "attributes" },
        { name: "order_count", label: "Orders", namespace: "attributes", formatter: AsNumber, textAlign: "right" },
        {
            name: "order_value",
            label: "Lifetime Value",
            namespace: "attributes",
            formatter: PosMoney,
            textAlign: "right"
        }
    ],
    props: {
        striped: true,
        selectable: true,
        singleLine: true,
        sortable: true
    }
};

export default tableDefinition;
