import { Money, AsNumber } from "../shared/textFormatters";

const tableDefinition = {
    fields: [
        { name: "id" },
        { name: "crop_id" },
        { name: "harvest_year" },
        { name: "on_hand", formatter: AsNumber },
        { name: "pounds_of_coffee", formatter: AsNumber },
        {
            name: "price_per_pound",
            formatter: props => Money({ ...props, type: "positive" })
        },
        {
            name: "contract_value",
            formatter: props => Money({ ...props, type: "positive", decimals: 0 })
        }
    ],
    props: {
        celled: true,
        striped: true,
        selectable: true
    }
};

export default tableDefinition;
