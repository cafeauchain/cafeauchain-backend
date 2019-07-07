import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Modal from "shared/modal";

import tableDefs from "defs/tables/openContracts";

import EditLot from "lots/edit";

import withContext from "contexts/withContext";
/* eslint-enable */

class OpenContracts extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            current: {}
        };
    }
    componentDidMount() {
        const { lots, getData } = this.props;
        if (lots === undefined) getData("lots");
    }
    closeModal = () => this.setState({ isOpen: false, current: {} });
    handleClick = (e, item) => {
        const { onboarding } = this.props;
        if (onboarding) {
            this.setState({ isOpen: true, current: item });
        } else {
            window.location = `/manage/lots/${item.id}`;
        }
    }
    render() {
        let { lots = [], limit = 5 } = this.props;
        const { isOpen, current } = this.state;
        const { loading } = this.props;
        if (limit === "none") {
            limit = undefined;
        }
        const limitLots = () => lots.slice(0, limit);
        return (
            <F>
                {isOpen && (
                    <Modal
                        isOpen={isOpen}
                        closeModal={this.closeModal}
                        title="Edit Lot Details"
                        icon="coffee"
                        component={<EditLot lot={current} onboarding />}
                    />
                )}
                
                <Header as="h2" content="Open Contracts" />
                <Table tableDefs={tableDefs} data={limitLots()} loading={loading} onClick={this.handleClick} />
                {lots.length > limit && (
                    <F>
                        <br />
                        <div style={{ textAlign: "right" }}>
                            <Button as="a" href="/manage/lots" content="View All Lots" />
                        </div>
                    </F>
                )}
            </F>
        );
    }
}

const { array, bool, func, oneOfType, number, string } = PropTypes;
OpenContracts.propTypes = {
    lots: array,
    onboarding: bool,
    loading: bool,
    getData: func,
    limit: oneOfType([number, string])
};

export default withContext(OpenContracts);
