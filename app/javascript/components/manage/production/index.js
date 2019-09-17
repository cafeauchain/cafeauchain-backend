import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Divider } from "semantic-ui-react";

/* eslint-disable */
import styles from  "./inline-print-styles";
import Table from "shared/table";
import { Weights } from "shared/textFormatters";
import Titler from "shared/titler";
import Packer from "manage/production/packer";

import { sortBy, humanize } from "utilities";

import withContext from "contexts/withContext";
/* eslint-enable */

const Humanize = ({ content }) => humanize(content);
// eslint-disable-next-line react/prop-types
const Link = ({ content }) => <a href={"/manage/orders/" + content}>{content}</a>;

const fields = {
    fields: [
        { name: 'product', style: { width: 200 } },
        { name: 'quantity', textAlign: "right", style: { width: 60 } },
        { name: 'size', textAlign: "right", style: { width: 60 } },
        { name: 'options', formatter: Humanize },
        { name: 'customer', style: { width: 200 }},
        { name: 'order', formatter: Link, textAlign: "right", label: "Order #", style: { width: 60 } },
    ],
    props: {
        celled: true,
        sortable: true,
        compact: "very"
    }
};

class Production extends React.PureComponent {

    filterOrders = orders => {
        return Object.entries(orders).map( ([key, val]) => {
            const sizes = Object.entries(val).map(([size, items]) => {
                let count = 0;
                const orders = items.map(order => {
                    count += Number(order.quantity);
                    return order;
                });
                return { size, orders, count };    
            });
            return { name: key, sizes };
        });
    }

    modifiedTableDefs = defs => {
        const WrappedPacker = (props) => {
            const { getData } = this.props;
            return <Packer {...props} getData={getData} fromQueue />;
        };
        const packer = {
            name: 'packed',
            style: { width: 60, position: "relative" },
            formatter: WrappedPacker,
            textAlign: "center"
        };
        let { fields, ...rest } = defs;
        // rest.fields = [packer, ...fields];
        rest.fields = [...fields];
        return rest;
    };

    render() {
        const { orders } = this.props;
        const filtered = this.filterOrders(orders);

        const sorted = sortBy({
            collection: filtered,
            sorts: [
                { name: "name" }
            ]
        });

        return (
            <Segment>
                <style type="text/css">
                    {styles}
                </style>
                <Header as="h2" content="Production Bags Needed" />
                <Divider />
                {sorted.map(product => (
                    <div key={product.name}>
                        <Header as="h3">
                            {product.name}
                        </Header>
                        {product.sizes.map(size => {
                            const title = (
                                <>
                                    <Weights>
                                        {size.size}
                                    </Weights>
                                    <span> Bags; </span>
                                    <Titler title="Bag Count" value={size.count.toFixed(0)} linebreak />
                                </>
                            );
                            return (
                                <div key={size.size}>
                                    <Table
                                        tableDefs={{ ...this.modifiedTableDefs(fields), title }}
                                        data={size.orders}
                                    />
                                    <Divider />
                                </div>
                            );
                        })}
                    </div>
                ))}
                <Divider />
            </Segment>
        );
    }
}
const { object, func } = PropTypes;
Production.propTypes = {
    orders: object,
    getData: func
};

export default withContext(Production);
