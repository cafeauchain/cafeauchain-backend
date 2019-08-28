import React from 'react';

/* eslint-disable */
import { AsNumber, PosMoney } from "shared/textFormatters";
import { humanize } from "utilities";
/* eslint-enable */

const Approval = props => {
    // eslint-disable-next-line react/prop-types
    const { content } = props;
    let value = content ? humanize(content) : "";
    if( content === "onboard_completed" ) value = <span style={{ color: 'red' }}>Pending Approval</span>;
    return value;
};

const tableDefinition = {
    fields: [
        { name: "company_name", label: "Company", namespace: "attributes" },
        { name: "onboard_status", label: "Status", namespace: "attributes/wholesale_profile", formatter: Approval },
        { name: "name", label: "Primary Contact", namespace: "attributes/owner" },
        { name: "email", label: "Contact Email", namespace: "attributes" },
        { name: "terms", namespace: "attributes" },
        { name: "order_count", label: "Orders", namespace: "attributes", formatter: AsNumber, textAlign: "right" },
        {
            name: "order_value",
            label: "Lifetime Value",
            namespace: "attributes",
            formatter: PosMoney,
            textAlign: "right"
        }
    ],
    props: {
        sortable: true
    }
};

export default tableDefinition;
