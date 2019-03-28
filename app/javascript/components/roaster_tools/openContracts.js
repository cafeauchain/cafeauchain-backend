import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/openContracts";

import withContext from "contexts/withContext";
/* eslint-enable */

class OpenContracts extends Component {
    componentDidMount() {
        const { lots, getData } = this.props;
        if (lots === undefined) getData("lots");
    }
    render() {
        let { lots = [], limit = 5 } = this.props;
        const { loading } = this.props;
        const onClick = (e, item) => {
            window.location = `/manage/lots/${item.id}`;
        };
        if (limit === "none") {
            limit = undefined;
        }
        const limitLots = () => lots.slice(0, limit);
        return (
            <F>
                <Header as="h2" content="Open Contracts" />
                <Table tableDefs={tableDefs} data={limitLots()} loading={loading} onClick={onClick} />
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
    loading: bool,
    getData: func,
    limit: oneOfType([number, string])
};

export default withContext(OpenContracts);
