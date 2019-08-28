import React from "react";
/* eslint-disable */
import { AsNumber, Time } from "shared/textFormatters";
/* eslint-enable */
const SingleDecimal = props => <AsNumber {...props} decimals={1} />;

const tableDefinition = {
    fields: [
        { name: "created_at", label: "Date", formatter: Time },
        { name: "quantity", label: "Amount", formatter: SingleDecimal, textAlign: "right" },
        { name: "trans_type", label: "Transaction" },
        { name: "batch_id" }
    ],
    props: {
        celled: true,
        sortable: true
    }
};

export default tableDefinition;
