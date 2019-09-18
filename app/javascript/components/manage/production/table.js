import React from "react";
import PropTypes from "prop-types";
import { Header, Divider } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import { Weights } from "shared/textFormatters";
import Titler from "shared/titler";

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
        { name: 'options', formatter: Humanize, style: { width: 100 } },
        { name: 'customer', style: { width: 200 } },
        { name: 'order', formatter: Link, textAlign: "right", label: "Order #", style: { width: 60 } },
    ],
    props: {
        celled: true,
        sortable: true,
        compact: "very"
    }
};

class ProductionTable extends React.PureComponent {

    filterOrders = orders => {
        return Object.entries(orders).map(([key, val]) => {
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
            sorted.map(product => {
                return (
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
                                    <Table tableDefs={{ ...fields, title }} data={size.orders} />
                                    <Divider />
                                </div>
                            );
                        })}
                    </div>
                );
            })
        );
    }
}
const { object } = PropTypes;
ProductionTable.propTypes = {
    orders: object
};

export default withContext(ProductionTable);
