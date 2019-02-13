/* eslint-disable */
import { AsNumber, Time } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "created_at", label: "Date", formatter: Time },
        { name: "quantity", label: "Amount", formatter: AsNumber, textAlign: "right" },
        { name: "trans_type", label: "Transaction" },
        { name: "batch_id" }
    ],
    props: {
        celled: true,
        striped: true,
        selectable: true,
        sortable: true,
        singleLine: true
    }
};

export default tableDefinition;
