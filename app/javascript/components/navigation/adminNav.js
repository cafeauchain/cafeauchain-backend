import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "semantic-ui-react";

/* eslint-disable */
import Modal from "shared/modal";

import StartBatch from "roaster_tools/startBatch";
import AcceptDelivery from "roaster_tools/inventory/acceptDelivery";
import SingleContract from "roaster_tools/inventory/singleContract";
import CreateInventory from "wholesale/actions/createInventory";
import CreateProduct from "wholesale/actions/createProduct";
import withContext from "contexts/withContext";
/* eslint-enable */

const ItemWithIcon = ({text}) => {
    return (
        <React.Fragment>
            <span>{`${text} `}</span>
            <Icon name="external" fitted />
        </React.Fragment>
    );
};
ItemWithIcon.propTypes = {
    text: PropTypes.string
};

const ModalLink = ({ text, title, component}) => {
    return (
        <Modal
            text={text}
            title={title || text}
            btnProps={{ content: <ItemWithIcon text={text} /> }}
            unstyled
            component={component}
        />
    );
};
ModalLink.propTypes = {
    text: PropTypes.string,
    title: PropTypes.string,
    component: PropTypes.node
};

class AdminNav extends PureComponent {
    render() {
        const {
            roaster: { id }
        } = this.props;

        const inventory = [
            { href: `/manage/lots`, content: "Open Lots" },
            {
                key: "startbatch",
                content: <ModalLink text="Start a Batch" component={<StartBatch />} />
            },
            {
                key: "acceptdelivery",
                content: <ModalLink text="Accept Delivery" component={<AcceptDelivery />} />
            },
            {
                key: "newcontract",
                content: <ModalLink text="Add New Contract" component={<SingleContract />} />
            },
            {
                key: "createinventoryitems",
                content: <ModalLink text="Add Roast Profile" component={<CreateInventory />} />
            }
        ];
        const profile = [
            { href: `/roasters/${id}/edit`, content: "Edit Profile" },
            { href: "/manage/subscription", content: "Update Payment Method" }
        ];

        const products = [
            {
                key: "addnewproducts",
                content: <ModalLink text="Add New Product" component={<CreateProduct />} />
            },
            {
                content: "View Products",
                href: "/manage/products"
            }
        ];
        const wholesale = [
            { href: "/manage/customers", content: "View Customers" },
            { href: "/manage/orders", content: "View Orders" }
        ];
        const support = [
            // { href: "/manage/customers", content: "Email Support**" },
            // { href: "/manage/customers", content: "FAQ**" }
        ];
        const buildItems = array => array.map(item => <Menu.Item as="a" key={item.key || item.content} {...item} />);

        return (
            <React.Fragment>
                <Menu.Item>
                    <Menu.Header as="a" href="/manage/dashboard" content="Green Inventory" />
                    <Menu.Menu content={buildItems(inventory)} />
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header as="a" href="/manage/products" content="Products" />
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
                    <Menu.Header as="a" href="/blog/contact" content="Support" />

                    <Menu.Menu content={buildItems(support)} />
                </Menu.Item>
            </React.Fragment>
        );
    }
}
const { object } = PropTypes;
AdminNav.propTypes = {
    roaster: object
};

export default withContext(AdminNav);
