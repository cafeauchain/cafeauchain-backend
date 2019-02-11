import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Modal, Button, Form } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Input from "shared/input";

import tableDefs from "tableDefinitions/openRoasts";

import requester from "utilities/apiUtils/requester";
import API_URL from "utilities/apiUtils/url";

import Batches from "contexts/batches";
/* eslint-enable */

const Wrapper = props => (
    <Batches>
        {batches => (
            <OpenRoasts
                {...props}
                batches={batches.data}
                loading={batches.loading}
                updateContext={batches.updateContext}
                userId={batches.userId}
            />
        )}
    </Batches>
);

class OpenRoasts extends Component {
    state = {
        isOpen: false,
        current: {},
        details: {}
    };

    closeModal = () => this.setState({ isOpen: false, current: {}, details: {} });

    onClick = (e, item) => {
        const { attributes } = item;
        this.setState({
            isOpen: true,
            current: item,
            details: { ending_amount: (Number(attributes.starting_amount) * 0.9).toFixed(2) }
        });
    };

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val;
        this.setState({ details });
    };

    handleSubmit = async ev => {
        ev.preventDefault();
        const { details, current } = this.state;
        const { id, attributes } = current;
        const { userId } = this.props;
        const url = `${API_URL}/roasters/${userId}/batches/${id}`;
        const body = { ...details };
        const method = "PUT";
        // TODO probably need to add in better error handler/input validation
        if (Number(details.ending_amount) > Number(attributes.starting_amount)) {
            alert("Your ending amount is more than your green coffee weight.");
            return;
        }

        let respJSON = await requester({ url, body, method });
        if (respJSON instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", respJSON.response);
        } else {
            if (respJSON.redirect) {
                window.location.href = await respJSON.redirect_url;
            } else {
                this.getBatchData(userId);
            }
        }
    };

    // only called after successful submit
    getBatchData = async id => {
        const url = `${API_URL}/roasters/${id}/batches`;
        const { updateContext } = this.props;
        const response = await fetch(url);
        const { data } = await response.json();
        if (data instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", data.response);
        } else {
            // TODO Add success/error messaging before closing
            updateContext({ data }, this.closeModal());
        }
    };

    renderForm = () => {
        const { current, details } = this.state;
        const { attributes } = current;
        return (
            <Form onSubmit={this.handleSubmit}>
                <div style={{ marginBottom: 20 }}>
                    <span style={{ fontWeight: "bold" }}>Starting Weight: </span>
                    {attributes.starting_amount}
                    <span> lbs</span>
                </div>
                <input type="hidden" value={current.id} />
                <Input
                    name="ending_amount"
                    label="Roasted Yield (in lbs)"
                    onChange={this.handleInputChange}
                    type="number"
                    defaultValue={details.ending_amount}
                    step={0.1}
                />
                <Button size="small" primary fluid>
                    Finish Batch
                </Button>
            </Form>
        );
    };

    render() {
        const { batches, loading } = this.props;
        const { isOpen, current } = this.state;
        const { attributes } = current;
        const title = attributes ? attributes.crop_name : "";
        const Inner = this.renderForm;
        return (
            <F>
                <Modal open={isOpen} onClose={this.closeModal} size="mini">
                    <Header as="h3" content={"Finish batch: " + title} />
                    <Modal.Content>
                        <Inner />
                    </Modal.Content>
                </Modal>
                <Header as="h2" content="Open Roasts" />
                <Table tableDefs={tableDefs} data={batches} loading={loading} onClick={this.onClick} />
            </F>
        );
    }
}

const { array, bool, func, oneOfType, string, number } = PropTypes;
OpenRoasts.propTypes = {
    batches: array,
    loading: bool,
    updateContext: func,
    userId: oneOfType([string, number])
};

export default Wrapper;
