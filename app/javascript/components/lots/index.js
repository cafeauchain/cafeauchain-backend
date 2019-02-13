import React from "react";
import PropTypes from "prop-types";
import { Container, Segment, Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "tableDefinitions/openContracts";
/* eslint-enable */

const AllContracts = props => {
    const onClick = (e, item) => {
        window.location = window.location + "/" + item.id;
    };

    const { lots, roaster: r } = props;
    const { data } = lots;
    return (
        <Container style={{ margin: "4em 0" }}>
            <Segment>
                <Header as="h2" content="All Contracts" />
                <Table tableDefs={tableDefs} data={data} onClick={onClick} />
                <br />
                <Button as="a" href={`/roasters/${r.slug}/dashboard`} content="Back to the Dashboard" />
            </Segment>
        </Container>
    );
};

const { object } = PropTypes;
AllContracts.propTypes = {
    lots: object,
    roaster: object
};

export default AllContracts;
