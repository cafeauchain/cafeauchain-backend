import React, { useEffect } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import tableDefinition from "defs/tables/invoiceExport";

import Table from "shared/table";
import { params as paramatize, paramString } from "utilities";
import withContext from "contexts/withContext";
/* eslint-enable */


const ReportingTable = ({ invoices = [], getData }) => {

    let string = window.location.search;
    let params = paramatize(string);

    useEffect(() => {
        getData("invoices", paramString(params));
    }, []);
    return (
        <Table tableDefs={tableDefinition} data={invoices} />
    );
};

const { array, func } = PropTypes;
ReportingTable.propTypes = {
    invoices: array,
    getData: func
};

export default withContext(ReportingTable);