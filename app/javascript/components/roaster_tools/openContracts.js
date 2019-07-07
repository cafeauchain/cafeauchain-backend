import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Modal from "shared/modal";

import tableDefs from "defs/tables/openContracts";

import EditLot from "lots/edit";

import { sortBy } from "utilities";

import withContext from "contexts/withContext";
/* eslint-enable */

class OpenContracts extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        };
    }
    componentDidMount() {
        const { lots, getData } = this.props;
        if (lots === undefined) getData("lots");
    }
    closeModal = () => this.setState({ isOpen: false });
    handleClick = async (e, item) => {
        const { onboarding, updateContext } = this.props;
        if (onboarding) {
            await updateContext({ lot: item });
            this.setState({ isOpen: true });
        } else {
            window.location = `/manage/lots/${item.id}`;
        }
    }
    render() {
        let { lots = [], limit = 5 } = this.props;
        const { isOpen } = this.state;
        const { loading } = this.props;
        if (limit === "none") {
            limit = undefined;
        }
        const sorted = sortBy({
            collection: lots,
            sorts: [{ name: "name" }],
            namespace: "attributes"
        });
        const limitLots = () => sorted.slice(0, limit);
        return (
            <F>
                {isOpen && (
                    <Modal
                        isOpen={isOpen}
                        closeModal={this.closeModal}
                        title="Edit Lot Details"
                        icon="coffee"
                        component={<EditLot onboarding />}
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
    updateContext: func,
    limit: oneOfType([number, string])
};

export default withContext(OpenContracts);
