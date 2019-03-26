import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Modal from "shared/modal";

import tableDefs from "defs/tables/products";

import CreateProduct from "wholesale/actions/createProduct";

import withContext from "contexts/withContext";
/* eslint-enable */

class ProductInventory extends React.Component {
    state = {
        isOpen: false,
        current: {}
    };
    componentDidMount() {
        const { products, getData } = this.props;
        if (products === undefined) getData("products");
    }

    onClick = (e, current) => {
        this.setState({
            isOpen: true,
            current
        });
    };
    closeModal = () => this.setState({ isOpen: false, current: {} });

    render() {
        const { products = [], loading, noEdit } = this.props;
        const { isOpen, current } = this.state;
        return (
            <F>
                {isOpen && (
                    <Modal
                        title={"Update " + current.attributes.title}
                        icon="edit"
                        isOpen={isOpen}
                        closeModal={this.closeModal}
                        component={<CreateProduct current={current} />}
                    />
                )}
                <Header as="h2" content="Products" />
                <Table tableDefs={tableDefs} data={products} loading={loading} onClick={noEdit ? null : this.onClick} />
            </F>
        );
    }
}

const { array, bool, func } = PropTypes;
ProductInventory.propTypes = {
    products: array,
    loading: bool,
    getData: func,
    noEdit: bool
};

export default withContext(ProductInventory);
