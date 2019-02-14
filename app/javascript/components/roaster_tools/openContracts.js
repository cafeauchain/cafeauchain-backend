import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/openContracts";

import Lots from "contexts/lots";
/* eslint-enable */

const Wrapper = props => (
    <Lots>{lots => <OpenContracts {...props} lots={lots.data} loading={lots.loading} userId={lots.userId} />}</Lots>
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
