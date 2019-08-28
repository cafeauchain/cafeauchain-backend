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
        { name: "order_date", namespace: "attributes", formatter: DateFormatter },
        { name: "id", label: "Order Id" },
        { name: "status", namespace: "attributes", formatter: Humanize },
        { name: "total_weight", namespace: "attributes", formatter: Weights, textAlign: "right" },
        { name: "subtotal", namespace: "attributes", formatter: Money, textAlign: "right" },
        { name: "shipping", namespace: "attributes", formatter: Money, textAlign: "right" },
        {
            name: "order_total",
            namespace: "attributes",
            label: "Total",
            formatter: props => Money({ ...props, type: "positive" }),
            textAlign: "right"
        }
    ],
    props: {}
};

export default tableDefinition;
