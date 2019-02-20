import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/roastedInventory";

import Roasted from "contexts/roasted";
/* eslint-enable */

const Wrapper = props => (
    <Roasted>
        {roasted => <Inventory {...props} data={roasted.data} loading={roasted.loading} userId={roasted.userId} />}
    </Roasted>
);

const Inventory = ({ data, loading, userId }) => {
    const onClick = (e, item) => {
        // eslint-disable-next-line
        console.log(item);
        alert("This should take you to more info about the roasted inventory levels.");
    };
    const limit = 5;
    const limitData = () => data.slice(0, limit);
    return (
        <F>
            <Header as="h2" content="Roasted Inventory Levels" />
            <Table tableDefs={tableDefs} data={limitData()} loading={loading} onClick={onClick} />
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
};

const { array, bool, oneOfType, string, number } = PropTypes;
Inventory.propTypes = {
    data: array,
    loading: bool,
    userId: oneOfType([string, number])
};

export default Wrapper;
