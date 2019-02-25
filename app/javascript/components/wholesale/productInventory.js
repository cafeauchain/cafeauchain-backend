import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/products";

import EditProductModal from "wholesale/actions/editProductModal";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <ProductInventory
                {...props}
                data={ctx.products}
                loading={ctx.loading}
                userId={ctx.userId}
                getCtxData={ctx.getData}
            />
        )}
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

    onClick = (e, item) => {
        this.setState({
            isOpen: true,
            current: item
        });
    };
    closeModal = () => this.setState({ isOpen: false, current: {} });

    render() {
        let { data } = this.props;
        if (data === undefined) data = [];
        const { loading, userId } = this.props;
        const { isOpen, current } = this.state;
        const limit = 25;
        const limitData = () => data.slice(0, limit);
        return (
            <F>
                {isOpen && <EditProductModal isOpen={isOpen} closeModal={this.closeModal} item={current} />}
                <Header as="h2" content="Products" />
                <Table tableDefs={tableDefs} data={limitData()} loading={loading} onClick={this.onClick} />
                {data.length > limit && (
                    <F>
                        <br />
                        <div style={{ textAlign: "right" }}>
                            <Button as="a" href={`/roasters/${userId}/lots`} content="View All Lots" />
                        </div>
                    </F>
                )}
            </F>
        );
    }
}

const { array, bool, oneOfType, string, number, func } = PropTypes;
ProductInventory.propTypes = {
    data: array,
    loading: bool,
    userId: oneOfType([string, number]),
    getCtxData: func
};

export default Wrapper;
