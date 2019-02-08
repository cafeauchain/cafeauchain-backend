import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import LotSelect from "shared/lots/lotSelect";

import requester from "utilities/apiUtils/requester";
import API_URL from "utilities/apiUtils/url";
import User from "contexts/user";
/* eslint-enable */

const Wrapper = props => {
    return (
        <User>
            {user => {
                return <StartBatch {...props} id={user.id} />;
            }}
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
        if (name === "starting_amount") {
            let endAmt = Number.isNaN(Number(val)) ? 0 : (Number(val) * 0.9).toFixed(0);
            lotDetails["ending_amount"] = endAmt;
        }
        this.setState({ lotDetails });
    };

    handleSubmit = async ev => {
        ev.preventDefault();
        const { lotDetails } = this.state;
        const { id, refreshAndClose } = this.props;
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
                // TODO figure out how to close modal
                // eslint-disable-next-line
                console.log(respJSON, "need to update parent component(s)");
                refreshAndClose();
            }
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
    refreshAndClose: func
};

export default Wrapper;
