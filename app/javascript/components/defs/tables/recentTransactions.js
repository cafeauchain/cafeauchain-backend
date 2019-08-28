/* eslint-disable */
import { AsNumber, Time } from "shared/textFormatters";
/* eslint-enable */

const tableDefinition = {
    fields: [
        { name: "crop_name", namespace: ["attributes", "crop"] },
        { name: "harvest_year", namespace: "attributes/crop" },
        { name: "quantity", namespace: "attributes", formatter: AsNumber },
        { name: "created_at", namespace: "attributes", formatter: Time },
        { name: "trans_type", namespace: "attributes" },
        { name: "lot_id", namespace: "attributes" },
        { name: "batch_id", namespace: "attributes" }
    ],
    props: {
        celled: true,
        sortable: true
    }
};

export default tableDefinition;
