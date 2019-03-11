import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

/* eslint-disable */
import Modal from "shared/modal";

import StartBatch from "roaster_tools/startBatch";
import AcceptDelivery from "roaster_tools/inventory/acceptDelivery";
import SingleContract from "roaster_tools/inventory/singleContract";
import CreateInventory from "wholesale/actions/createInventory";
import CreateProduct from "wholesale/actions/createProduct";
/* eslint-enable */

class AdminNav extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            roaster: { id }
        } = this.props;

        const inventory = [
            { href: `/manage/lots`, content: "Open Lots" },
            {
                key: "startbatch",
                content: <Modal text="Start a Batch" title="Start a Batch" unstyled component={<StartBatch />} />
            },
            {
                key: "acceptdelivery",
                content: (
                    <Modal text="Accept Delivery" title="Accept Delivery" unstyled component={<AcceptDelivery />} />
                )
            },
            {
                key: "newcontract",
                content: <Modal text="New Contract" title="New Contract" unstyled component={<SingleContract />} />
            },
            {
                key: "createinventoryitems",
                content: (
                    <Modal
                        text="Create Inventory Items"
                        title="Create Inventory Items"
                        unstyled
                        component={<CreateInventory />}
                    />
                )
            }
        ];
        const profile = [
            { href: `/roasters/${id}/edit`, content: "Edit Profile" },
            { href: "/manage/subscription", content: "Update Payment Method" }
        ];

        const products = [
            {
                key: "addnewproducts",
                content: (
                    <Modal text="Add New Products" title="Add New Products" unstyled component={<CreateProduct />} />
                )
            },
            { href: "/manage/wholesale", content: "View/Edit Pricing Table*" }
        ];
        const wholesale = [
            { href: "/manage/customers", content: "Add Customers**" },
            { href: "/manage/customers", content: "View Customers" },
            { href: "/manage/orders", content: "View Orders" }
        ];
        const support = [
            { href: "/manage/customers", content: "Email Support**" },
            { href: "/manage/customers", content: "FAQ**" }
        ];
        const buildItems = array => array.map(item => <Menu.Item as="a" key={item.key || item.content} {...item} />);

        return (
            <Menu vertical inverted fluid borderless>
                <Menu.Item>
                    <Menu.Header as="a" href="/manage/dashboard" content="Dashboard" />
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header as="a" href="/manage/inventory" content="Green Inventory" />
                    <Menu.Menu content={buildItems(inventory)} />
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header as="a" href="/manage/inventory" content="Products*" />
                    <Menu.Menu content={buildItems(products)} />
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header as="a" href={"/roasters/" + id} content="Profile" />

                    <Menu.Menu content={buildItems(profile)} />
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header as="a" href="/manage/wholesale" content="Wholesale" />
                    <Menu.Menu content={buildItems(wholesale)} />
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header as="a" href="/manage/dashboard" content="Support**" />

                    <Menu.Menu content={buildItems(support)} />
                </Menu.Item>
            </Menu>
        );
    }
}
const { object } = PropTypes;
AdminNav.propTypes = {
    roaster: object
};

export default AdminNav;