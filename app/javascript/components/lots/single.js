import React from "react";
import PropTypes from "prop-types";
import { Container, Segment, Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Details from "shared/details";

import tableDefs from "defs/tables/lotTransactions";
import detailFields from "defs/details/singleLot";
/* eslint-enable */

const SingleLot = props => {
    const { lot, roaster: r } = props;
    const { data } = lot;
    const { attributes } = data;
    return (
        <Container style={{ margin: "4em 0" }}>
            <Segment>
                <Header as="h2" content={attributes.crop_name} />
                <Segment>
                    <Container text>
                        <Header as="h3" content="Details" />
                        <Details leftWidth={200} attributes={attributes} fields={detailFields} />
                    </Container>
                </Segment>
            </Segment>
            <Segment>
                <Header as="h3" content="Transactions" />
                <Table tableDefs={tableDefs} data={attributes.transactions} />
                <br />
                <Button as="a" href={`/roasters/${r.slug}/lots`} content="Back to Lots" />
            </Segment>
        </Container>
    );
};

const { object } = PropTypes;
SingleLot.propTypes = {
    lot: object,
    roaster: object
};

export default SingleLot;
