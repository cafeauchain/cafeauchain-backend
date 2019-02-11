import { AsNumber } from "../shared/textFormatters";

const tableDefinition = {
    fields: [
        {
            name: "crop_name",
            namespace: "attributes",
            label: "Crop Name (Harvest Year)",
            width: 8
        },
        { name: "starting_amount", namespace: "attributes", formatter: AsNumber, label: "Green Weight" }
    ],
    props: {
        celled: true,
        striped: true,
        selectable: true,
        singleLine: true
    }
};

export default tableDefinition;
