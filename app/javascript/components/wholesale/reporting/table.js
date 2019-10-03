import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Table from "shared/table";

import withContext from "contexts/withContext";
/* eslint-enable */


import moment from "moment";

/* eslint-disable */
import { Money } from "shared/textFormatters";

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
        { name: "id", label: "Invoice Id", textAlign: "center" },
        { name: "customer", namespace: "attributes" },
        { name: "order_date", namespace: "attributes", formatter: DateFormatter },
        { name: "status", namespace: "attributes", formatter: Humanize },
        { name: "paid_date", namespace: "attributes", formatter: DateFormatter },
        { name: "subtotal", namespace: "attributes", formatter: Money, textAlign: "right" },
        { name: "shipping", namespace: "attributes", formatter: Money, textAlign: "right" },
        { name: "discount", namespace: "attributes", formatter: Money, textAlign: "right" },
        { name: "taxable", namespace: "attributes", formatter: Money, textAlign: "right" },
        { name: "tax", namespace: "attributes", formatter: Money, textAlign: "right" },
        { name: "total", namespace: "attributes", formatter: Money, textAlign: "right" },
        { name: "fee", namespace: "attributes", formatter: Money, textAlign: "right" },
        { name: "net", namespace: "attributes", formatter: Money, textAlign: "right" }
    ],
    props: {
        sortable: true
    }
};

const ReportingTable = ({ invoices = [] }) => {
    return (
        <Table tableDefs={tableDefinition} data={invoices} />
    );
};

const { array } = PropTypes;
ReportingTable.propTypes = {
    invoices: array
};

export default withContext(ReportingTable);