import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Divider } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import { Weights } from "shared/textFormatters";
import Packer from "manage/production/packer";

import { sortBy, humanize } from "utilities";

import withContext from "contexts/withContext";
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
                sorts: [
                    { name: "product" }, 
                    { name: "packed" },
                    { name: "options" }, 
                    { name: "quantity" }, 
                    { name: "customer" }
                ]
            });

            return [...obj, { size: Number(item), total: inner.total, items: sorted }];
        }, []);
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
        rest.fields = [packer, ...fields];
        return rest;
    };

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
                                <Table tableDefs={this.modifiedTableDefs(fields)} data={size.items} />
                            </Segment>
                            <br />
                        </React.Fragment>      
                    );
                })}
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
