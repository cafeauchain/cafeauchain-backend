import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

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
            { href: `/manage/dashboard`, content: "Open Lots" },
            { href: `/manage/inventory`, content: "Start a Batch" },
            { href: `/manage/subscription`, content: "Accept Delivery" },
            { href: `/roasters/${id}/edit`, content: "New Contract" },
            { href: `/manage/wholesale`, content: "Import Contracts" },
            { href: "/manage/wholesale", content: "Create Inventory Items" }
        ];
        const profile = [
            { href: `/roasters/${id}/edit`, content: "Edit Profile" },
            { href: "/manage/subscription", content: "Update Payment Method" }
        ];

        const products = [
            { href: "/manage/dashboard", content: "Add New Products" },
            { href: "/manage/dashboard", content: "View/Edit Pricing Table" }
        ];
        const wholesale = [
            { href: "/manage/customers", content: "Add Customers" },
            { href: "/manage/customers", content: "View Customers" },
            { href: "/manage/orders", content: "View Orders" }
        ];
        const support = [
            { href: "/manage/customers", content: "Email Support" },
            { href: "/manage/customers", content: "FAQ" }
        ];
        const buildItems = array => array.map(item => <Menu.Item as="a" key={item.content} {...item} />);

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
                    <Menu.Header as="a" href="/manage/inventory" content="Products" />
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
                    <Menu.Header as="a" href="/manage/dashboard" content="Support" />

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
