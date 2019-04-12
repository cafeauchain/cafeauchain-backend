import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Divider } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import { Weights } from "shared/textFormatters";
import { sortBy, humanize } from "utilities";
/* eslint-enable */

const Humanize = ({ content }) => humanize(content);
// eslint-disable-next-line react/prop-types
const Link = ({ content }) => <a href={"/manage/orders/" + content}>{content}</a>;

const fields = {
    fields: [
        { name: 'product', style: {minWidth: 200} },
        { name: 'quantity', textAlign: "right", style: { width: 60 } },
        { name: 'options', formatter: Humanize },
        { name: 'customer' },
        { name: 'order', formatter: Link, textAlign: "right", label: "Order #", style: { width: 60 } },
    ],
    props: {
        celled: true,
        striped: true,
        selectable: true,
        sortable: true,
        singleLine: true
    }
};

class Production extends React.PureComponent {

    filterOrders = orders => {
        const sizes = Object.keys(orders);
        return sizes.reduce((obj, item) => {

            let inner = orders[item].reduce((obj, order) => {
                obj.total = obj.total + parseInt(order.quantity);
                obj.items = [...obj.items, order];
                return obj;
            }, { total: 0, items: [] });

            const sorted = sortBy({
                collection: inner.items,
                sorts: [{ name: "product" }, { name: "options" }, { name: "customer" }]
            });

            return [...obj, { size: Number(item), total: inner.total, items: sorted }];
        }, []);
    }

    render() {
        const { orders } = this.props;
        const filtered = this.filterOrders(orders);

        return (
            <Segment>
                <Header as="h2" content="Production Bags Needed" />
                <Divider />
                {filtered.map(size => {
                    return (
                        <React.Fragment key={size.size}>
                            <Segment>
                                <Header as="h3">
                                    <Weights>{size.size}</Weights>
                                    <span> Bags</span>
                                </Header>
                                <p>
                                    <strong>Total bags: </strong>
                                    {size.total}
                                </p>
                                <Table tableDefs={fields} data={size.items} />
                            </Segment>
                            <br />
                        </React.Fragment>      
                    );
                })}
            </Segment>
        );
    }
}
const { object } = PropTypes;
Production.propTypes = {
    orders: object
};

export default Production;
