import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

/* eslint-disable */
import tableDefs from "defs/tables/invoiceExport";

import { namespacer, underscorer } from "utilities";
import withContext from "contexts/withContext";
/* eslint-enable */

const handleNamespace = (namespace, name, item) => namespace ? namespacer(namespace, item)[name] : item[name];

const Action = ({invoices}) => {
    const processData = () => {
        const headers = tableDefs.fields.map(({name}) => underscorer(name));
        const data = invoices.reduce((acc, item) => {
            const arr = tableDefs.fields.map(({name, namespace}) => handleNamespace(namespace, name, item));
            return [...acc, arr];    
        }, [headers]);

        const csvContent = "data:text/csv;charset=utf-8," + data.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "invoice-export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <Button content="Download Report" primary size="small" onClick={processData} />
    );
};
const { array } = PropTypes;
Action.propTypes = {
    invoices: array
};

export default withContext(Action);
