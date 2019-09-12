import React from "react";
import moment from "moment";
/* eslint-disable */
import { AsNumber } from "shared/textFormatters";
/* eslint-enable */

const AnyDecimal = props => <AsNumber {...props} anyDecimals />;

const FormattedDate = ({ content }) => moment(content).format("MMM D");

const tableDefinition = {
    fields: [
        { name: "inventory_item_name", namespace: "attributes", label: "Roast Profile" },
        { name: "lot_name", namespace: "attributes" },
        {
            name: "starting_amount",
            namespace: "attributes",
            formatter: AnyDecimal,
            label: "Green (lbs)",
            textAlign: "right"
        },
        { name: "ending_amount", namespace: "attributes", formatter: AnyDecimal, textAlign: "right", label: "Yield" },
        { name: "roast_date", namespace: "attributes", formatter: FormattedDate }
    ],
    props: {
        celled: true
    }
};

export default tableDefinition;
