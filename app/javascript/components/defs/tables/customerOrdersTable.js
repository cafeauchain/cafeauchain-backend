// import React from "react";
import moment from "moment";

/* eslint-disable */
import { AsNumber, Time, Weights, Money } from "shared/textFormatters";
import { humanize } from "utilities";
/* eslint-enable */

const DateFormatter = props => {
    return moment(props.content).format("MMM D, YYYY");
};

const Humanize = props => {
    return humanize(props.content);
};

const tableDefinition = {
    fields: [
        { name: "order_date", formatter: DateFormatter },
        { name: "id", label: "Order Id" },
        { name: "status", formatter: Humanize },
        { name: "total_weight", formatter: Weights, textAlign: "right" },
        { name: "subtotal", formatter: Money, textAlign: "right" },
        { name: "shipping", formatter: Money, textAlign: "right" },
        {
            name: "order_total",
            label: "Total",
            formatter: props => Money({ ...props, type: "positive" }),
            textAlign: "right"
        }
    ],
    props: {
        sortable: true
    }
};

export default tableDefinition;
