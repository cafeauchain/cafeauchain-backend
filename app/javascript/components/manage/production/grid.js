import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Table from "shared/table";
import { Weights } from "shared/textFormatters";

import { sortBy, humanize, truncate } from "utilities";

import withContext from "contexts/withContext";
/* eslint-enable */

const Humanize = ({ content }) => humanize(content);

const tableDefs = {
    fields: [
        { name: "customer", label: "Customer" },
        { name: "size", formatter: Weights, textAlign: "right" },
        { name: "options", formatter: Humanize }
    ],
    props: {
        celled: true,
        compact: "very",
        striped: false,
        sortable: true
    }
};

class ProductionGrid extends React.PureComponent {

    modifiedTableDefs = data => {
        let { fields, ...rest } = tableDefs;
        let newFields = Object.keys(data.products).map(field => ({
            name: field, label: truncate(field, 5, false), namespace: "products", textAlign: "center"
        }));
        fields = [...fields, ...newFields];
        return { ...rest, fields };
    }

    render() {
        const { variations } = this.props;

        const sorted = sortBy({
            collection: variations,
            sorts: [
                { name: "customer" },
                { name: "size" },
                { name: "options" }
            ]
        });

        const gridTableDefs = this.modifiedTableDefs(variations[0]);

        return <Table tableDefs={gridTableDefs} data={sorted} />;
    }
}
const { array } = PropTypes;
ProductionGrid.propTypes = {
    variations: array
};

export default withContext(ProductionGrid);
