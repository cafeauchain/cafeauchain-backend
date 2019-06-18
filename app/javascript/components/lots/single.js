import React from "react";
import PropTypes from "prop-types";
import { Container, Segment, Header, Button, Divider } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Details from "shared/details";
import Modal from "shared/modal"; 

import tableDefs from "defs/tables/lotTransactions";
import fields from "defs/details/singleLot";
import EditLot from "lots/edit"

import withContext from "contexts/withContext";
/* eslint-enable */

const SingleLot = props => {
    const { lot } = props;
    const { attributes } = lot;
    return (
        <React.Fragment>
            <Segment>
                <Header as="h2" content="Lot Details" />
                <Segment>
                    <Container text>
                        <Header as="h3" content="Details" />
                        <Details leftWidth={200} attributes={attributes} fields={fields.base} />
                        <Divider />
                        <Details leftWidth={200} attributes={attributes} fields={fields.roasted} />
                        <Divider />
                        <Details leftWidth={200} attributes={attributes} fields={fields.warehouse} />
                        <Divider />
                        <Details leftWidth={200} attributes={attributes} fields={fields.on_hand} />
                    </Container>
                </Segment>
                <Modal
                    text="Edit Lot"
                    title="Edit Lot Details"
                    icon="coffee"
                    component={<EditLot />}
                />
            </Segment>
            <Segment>
                <Header as="h3" content="Transactions" />
                <Table tableDefs={tableDefs} data={attributes.transactions} />
                <br />
                <Button as="a" href="/manage/lots" content="Back to Lots" />
            </Segment>
        </React.Fragment>
    );
};

const { object } = PropTypes;
SingleLot.propTypes = {
    lot: object
};

export default withContext(SingleLot);
