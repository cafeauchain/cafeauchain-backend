import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/openContracts";
/* eslint-enable */

const AllContracts = props => {
    const onClick = (e, item) => {
        window.location = window.location + "/" + item.id;
    };

    const { lots, roaster: r } = props;
    const { data } = lots;
    return (
        <Segment>
            <Header as="h2" content="All Contracts" />
            <Table tableDefs={tableDefs} data={data} onClick={onClick} />
            <br />
            <Button as="a" href={`/roasters/${r.slug}/dashboard`} content="Back to the Dashboard" />
        </Segment>
    );
};

const { object } = PropTypes;
AllContracts.propTypes = {
    lots: object,
    roaster: object
};

export default AllContracts;
