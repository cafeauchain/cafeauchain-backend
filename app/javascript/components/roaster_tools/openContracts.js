import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/openContracts";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>{ctx => <OpenContracts {...props} lots={ctx.lots} loading={ctx.loading} userId={ctx.userId} />}</Context>
);

const OpenContracts = ({ lots, loading, userId }) => {
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
};

const { array, bool, oneOfType, string, number } = PropTypes;
OpenContracts.propTypes = {
    lots: array,
    loading: bool,
    userId: oneOfType([string, number])
};

export default Wrapper;
