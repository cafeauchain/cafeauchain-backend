import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import Input from "shared/input";
import LotSelect from "shared/lots/lotSelect";

import requester from "utilities/apiUtils/requester";
import API_URL from "utilities/apiUtils/url";

import Lots from "contexts/lots";
import Batches from "contexts/batches";
import Activity from "contexts/activity";
/* eslint-enable */

const Wrapper = props => (
    <Lots>
        {lots => (
            <Batches>
                {batches => (
                    <Activity>
                        {activity => (
                            <StartBatch
                                {...props}
                                id={lots.userId}
                                updateLots={lots.updateContext}
                                updateBatches={batches.updateContext}
                                updateActivity={activity.updateContext}
                            />
                        )}
                    </Activity>
                )}
            </Batches>
        )}
    </Lots>
);
class StartBatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lotDetails: {
                starting_amount: "",
                ending_amount: ""
                // roast_date: moment().format("YYYY-MM-DD")
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
                this.getData(id);
            }
        }
    };

    // only called after successful submit
    // TODO This feels dumb and I should think of a better solution
    // Also, I dont think the try/catch will work like I want it to
    getData = async id => {
        const lotsUrl = `${API_URL}/roasters/${id}/lots`;
        const batchesUrl = `${API_URL}/roasters/${id}/batches`;
        const activityUrl = `${API_URL}/roasters/${id}/subscriptions`;
        const { updateLots, updateBatches, updateActivity, closeModal } = this.props;
        try {
            const lots = await fetch(lotsUrl);
            const batches = await fetch(batchesUrl);
            const activity = await fetch(activityUrl);
            const { data: lotsData } = await lots.json();
            const { data: batchesData } = await batches.json();
            const { data: activityData } = await activity.json();
            updateLots(
                { data: lotsData },
                updateBatches({ data: batchesData }, updateActivity({ data: activityData }, closeModal()))
            );
        } catch (e) {
            // eslint-disable-next-line
            console.log(e);
        }
    };

    render() {
        const { id } = this.props;
        const { lotDetails } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                {/* TODO Ready for roast date */}
                {false && (
                    <Input
                        name="roast_date"
                        label="Date"
                        onChange={this.handleInputChange}
                        type="date"
                        defaultValue={moment().format("YYYY-MM-DD")}
                    />
                )}
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
    updateLots: func,
    updateBatches: func,
    updateActivity: func
};

export default Wrapper;
