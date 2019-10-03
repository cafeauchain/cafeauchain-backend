import React from "react";
import { Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Filters from "wholesale/reporting/filters";
import Table from "wholesale/reporting/table";
import Download from "wholesale/reporting/download";
/* eslint-enable */

const dates = ["Today", "Yesterday", "This Week", "Last Week", "This Month", "Last Month"];
const invoice_statuses = ["Processing", "Awaiting Payment", "Payment Authorized", "Paid in Full", "All"];


const selects = [
    { name: "Status", options: invoice_statuses, value: "status", flex: "auto", style: { minWidth: 180 } },
    { name: "Order Date Range", options: dates, value: "order_range", flex: "auto", style: { minWidth: 180 } },
    { name: "Paid Date Range", options: dates, value: "paid_range", flex: "auto", style: { minWidth: 180 } }
];

const Dashboard = () => (
    <div>
        <Segment>
            <Header as="h1" content="Order Export" />
        </Segment>
        <Segment>
            <Filters type="invoices" selects={selects} action={<Download />} />
            <Table />
        </Segment>
    </div>
);

export default Dashboard;
