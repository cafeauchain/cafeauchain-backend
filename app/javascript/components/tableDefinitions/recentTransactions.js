import { AsNumber, Time } from "../shared/textFormatters";

const tableDefinition = {
    fields: [
        { name: "id" },
        { name: "crop_id" },
        { name: "harvest_year" },
        { name: "tx_id" },
        { name: "quantity", formatter: AsNumber },
        { name: "created_at", formatter: Time },
        { name: "updated_at", formatter: Time },
        { name: "trans_type" },
        { name: "roaster_profile_id" },
        { name: "lot_id" },
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
