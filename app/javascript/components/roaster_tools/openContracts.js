import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/openContracts";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <OpenContracts
                {...props}
                lots={ctx.lots}
                loading={ctx.loading}
                userId={ctx.userId}
                getCtxData={ctx.getData}
            />
        )}
    </Context>
);

class OpenContracts extends Component {
    componentDidMount() {
        const { lots, getCtxData } = this.props;
        if (lots === undefined) {
            getCtxData("lots");
        }
    }
    render() {
        let { lots } = this.props;
        const { userId, loading } = this.props;
        if (lots === undefined) lots = [];
        const onClick = (e, item) => {
            window.location = `/roasters/${userId}/lots/${item.id}`;
        };
        const limit = 5;
        const limitLots = () => lots.slice(0, limit);
        return (
            <F>
                <Header as="h2" content="Open Contracts" />
                <Table tableDefs={tableDefs} data={limitLots()} loading={loading} onClick={onClick} />
                {lots.length > limit && (
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
OpenContracts.propTypes = {
    lots: array,
    loading: bool,
    userId: oneOfType([string, number]),
    getCtxData: func
};

export default Wrapper;
