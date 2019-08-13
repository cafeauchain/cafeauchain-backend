import moment from "moment";

/* eslint-disable */
import { Weights, Money, PosMoney } from "shared/textFormatters";

import { humanize } from "utilities";
/* eslint-enable */

const DateFormatter = props => {
    return moment(props.content).format("MMM D");
};

const Humanize = props => {
    return humanize(props.content);
};

const tableDefinition = {
    fields: [
        { name: "company_name", namespace: "attributes", link: "/manage/orders/" },
        { name: "order_date", namespace: "attributes", formatter: DateFormatter, link: "/manage/orders/" },
        { 
            name: "estimated_roast_date", 
            namespace: "attributes", 
            label: "Roast Date", 
            formatter: DateFormatter, 
            link: "/manage/orders/"
        },
        { name: "id", label: "Order Id", link: "/manage/orders/", textAlign: "center" },
        { name: "status", namespace: "attributes", formatter: Humanize },
        { name: "total_weight", namespace: "attributes", formatter: Weights, textAlign: "right" },
        { name: "subtotal", namespace: "attributes", formatter: Money, textAlign: "right" },
        { name: "shipping", namespace: "attributes", formatter: Money, textAlign: "right" },
        {
            name: "order_total",
            namespace: "attributes",
            label: "Total",
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
