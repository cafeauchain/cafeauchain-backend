import React, { useState } from "react";
import PropTypes from "prop-types";
import { Divider, Button } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import Table from "shared/table";
import Input from "shared/input";
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
        sortable: true,
        collapsing: true
    }
};

const ProductionGrid = ({variations}) => {
    
    const products = Object.keys(variations[0].products);
    const productsLength = products ? products.length : 0;
    const defaultProductCount = productsLength > 10 ? 10 : productsLength;
    const [productCount, updateProductCount] = useState(defaultProductCount);

    const modifiedTableDefs = products => {
        let { fields, ...rest } = tableDefs;
        let newFields = products.map(field => ({
            name: field, 
            label: truncate(field, 5, false), 
            namespace: "products", 
            textAlign: "center",
            style: { width: 60 }
        }));
        fields = [...fields, ...newFields];
        return { ...rest, fields };
    };

    const splitProducts = (array, chunk) => {
        let i, j, temparray;
        let chunks = [];
        for (i = 0, j = array.length; i < j; i += chunk) {
            temparray = array.slice(i, i + chunk);
            chunks.push({start: i, data: temparray});
        }
        return chunks;
    };

    const productCountOptions = (max = 6) => {
        return Array.from(Array(max).keys()).map(i => {
            const val = i + 1;
            return { text: val, value: val, key: val };
        });
    };

    const handleChange = (e,{ value }) => updateProductCount(value);
    
    const printGrid = e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        window.print();
    }; 

    const chunks = splitProducts(products, productCount);

    const sorted = sortBy({
        collection: variations,
        sorts: [
            { name: "customer" },
            { name: "size" },
            { name: "options" }
        ]
    });

    return (
        <>
            <Divider />
            <Flex spacebetween spacing="20">
                <div style={{ maxWidth: 160, marginBottom: 10 }} className="noprint">
                    <Input
                        inputType="select"
                        options={productCountOptions(productsLength)}
                        name="productCount"
                        label="Products to Show"
                        value={productCount}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Button content="Print" icon="print" onClick={printGrid} className="noprint" />
                </div>
            </Flex>
            {chunks.map(({start, data},idx) => {
                const gridTableDefs = modifiedTableDefs(data);
                return (
                    <React.Fragment key={start}>
                        {idx > 0 && <div style={{ marginTop: 10 }} />}
                        <Table tableDefs={gridTableDefs} data={sorted} /> 
                    </React.Fragment>
                );
            })}
        </>
    );
};
const { array } = PropTypes;
ProductionGrid.propTypes = {
    variations: array
};

export default withContext(ProductionGrid);
