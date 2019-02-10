import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import LotSelect from "shared/lots/lotSelect";

import requester from "utilities/apiUtils/requester";
import API_URL from "utilities/apiUtils/url";

import User from "contexts/user";
import Lots from "contexts/lots";
/* eslint-enable */

const Wrapper = props => {
    return (
        <User>
            {user => <Lots>{lots => <StartBatch {...props} id={user.id} updateContext={lots.updateContext} />}</Lots>}
        </User>
    );
};
class StartBatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lotDetails: {
                starting_amount: "",
                ending_amount: ""
            }
        };
    }

    parentState = obj => {
        this.setState(obj);
    };

    handleInputChange = (event, { value, name, checked }) => {
        let { lotDetails } = this.state;
        lotDetails = { ...lotDetails };
        if (name === "") return;
        const val = value || checked;
        lotDetails[name] = val;
        this.setState({ lotDetails });
    };

    handleSubmit = async ev => {
        ev.preventDefault();
        const { lotDetails } = this.state;
        const { id } = this.props;
        const url = `${API_URL}/roasters/${id}/batches`;
        let body = { ...lotDetails };
        let respJSON = await requester({ url, body });
        if (respJSON instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", respJSON.response);
        } else {
            if (respJSON.redirect) {
                window.location.href = await respJSON.redirect_url;
            } else {
                this.getLotData(id);
            }
        }
    };

    // only called after successful submit
    getLotData = async id => {
        const url = `${API_URL}/roasters/${id}/lots`;
        const { updateContext, closeModal } = this.props;
        const response = await fetch(url);
        const { data } = await response.json();
        if (data instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", data.response);
        } else {
            // TODO Add success/error messaging before closing
            updateContext({ lots: data }, closeModal());
        }
    };

    render() {
        const { id } = this.props;
        const { lotDetails } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <LotSelect roasterId={id} parentState={this.parentState} fluid />
                <Input name="starting_amount" label="Amount to be Roasted (in lbs)" onChange={this.handleInputChange} />
                {false && (
                    <Input
                        name="ending_amount"
                        label="Expected Yield (in lbs)"
                        onChange={this.handleInputChange}
                        value={lotDetails.ending_amount}
                    />
                )}
                <Button size="small" primary fluid>
                    Start a Batch
                </Button>
            </Form>
        );
    }
}

const { oneOfType, string, number, func } = PropTypes;
StartBatch.propTypes = {
    id: oneOfType([number, string]),
    closeModal: func,
    updateContext: func
};

export default Wrapper;
