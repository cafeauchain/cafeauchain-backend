import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Modal from "shared/modal";

import tableDefs from "defs/tables/products";

import EditProduct from "wholesale/actions/editProduct";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => <ProductInventory {...props} data={ctx.products} loading={ctx.loading} getCtxData={ctx.getData} />}
    </Context>
);

class ProductInventory extends React.Component {
    state = {
        isOpen: false,
        current: {}
    };
    componentDidMount() {
        const { data, getCtxData } = this.props;
        if (data === undefined) {
            getCtxData("products");
        }
    }

    onClick = (e, current) => {
        this.setState({
            isOpen: true,
            current
        });
    };
    closeModal = () => this.setState({ isOpen: false, current: {} });

    render() {
        const { data = [], loading } = this.props;
        const { isOpen, current } = this.state;
        return (
            <F>
                {isOpen && (
                    <Modal
                        title={"Update " + current.attributes.title}
                        icon="edit"
                        isOpen={isOpen}
                        closeModal={this.closeModal}
                        component={<EditProduct current={current} />}
                    />
                )}
                <Header as="h2" content="Products" />
                <Table tableDefs={tableDefs} data={data} loading={loading} onClick={this.onClick} />
            </F>
        );
    }
}

const { array, bool, func } = PropTypes;
ProductInventory.propTypes = {
    data: array,
    loading: bool,
    getCtxData: func
};

export default Wrapper;
