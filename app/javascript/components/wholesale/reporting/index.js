import React from "react";
import PropTypes from "prop-types";
import { Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Filters from "wholesale/reporting/filters";
import Download from "wholesale/reporting/download";
import tableDefs from "defs/tables/invoiceExport";
import withContext from "contexts/withContext";
/* eslint-enable */

const dates = ["Today", "Yesterday", "This Week", "Last Week", "This Month", "Last Month"];
const invoice_statuses = ["Processing", "Awaiting Payment", "Payment Authorized", "Paid in Full", "All"];

const selects = [
    { name: "Status", options: invoice_statuses, value: "status", flex: "auto", style: { minWidth: 180 } },
    { name: "Order Date Range", options: dates, value: "order_range", flex: "auto", style: { minWidth: 180 } },
    { name: "Paid Date Range", options: dates, value: "paid_range", flex: "auto", style: { minWidth: 180 } }
];

const Dashboard = ({invoices}) => (
    <div>
        <Segment>
            <Header as="h1" content="Order Export" />
        </Segment>
        <Segment>
            <Filters type="invoices" selects={selects} action={<Download />} />
            <Table tableDefs={tableDefs} data={invoices} />
        </Segment>
    </div>
);

Dashboard.propTypes = {
    invoices: PropTypes.array
};

export default withContext(Dashboard);
