import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import Input from "shared/input";
import LotSelect from "shared/lots/lotSelect";
import ErrorHandler from "shared/errorHandler";

import { noEmpties } from "utilities";

import { requester, fetcher, roasterUrl as ROASTER_URL } from "utilities/apiUtils";

import Log from "contexts/lotsByPeriod";
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
                            <Log>
                                {log => (
                                    <StartBatch
                                        {...props}
                                        id={lots.userId}
                                        updateLots={lots.updateContext}
                                        updateBatches={batches.updateContext}
                                        updateActivity={activity.updateContext}
                                        activity={activity.data}
                                        updateLog={log.updateContext}
                                        lotData={lots.data}
                                    />
                                )}
                            </Log>
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
                roast_date: moment().format("YYYY-MM-DD")
            },
            btnLoading: false,
            errors: []
        };
    }

    parentState = obj => {
        if (obj.lotDetails) {
            let { lotDetails } = this.state;
            const { lotDetails: lotDetailsFromChild, ...rest } = obj;
            lotDetails = { ...lotDetails, ...lotDetailsFromChild };
            this.setState({ lotDetails, ...rest });
        } else {
            this.setState(obj);
        }
    };

    handleInputChange = (event, { value, name, checked }) => {
        let { lotDetails } = this.state;
        lotDetails = { ...lotDetails };
        if (name === "") return;
        const val = value || checked;
        lotDetails[name] = val;
        this.setState({ lotDetails, errors: [] });
    };

    startSubmit = ev => {
        ev.preventDefault();
        this.setState({ btnLoading: true }, this.handleSubmit);
    };

    handleSubmit = async () => {
        const { lotDetails } = this.state;
        const { id, activity } = this.props;
        const { attributes } = activity;
        if (moment(attributes.period_start_date).isAfter(lotDetails.roast_date, "day")) {
            /* eslint-disable */
            const message =
                "You are trying to create a roast for a previous billing period. If you need to add a roast from a previous period, please email us at support@cafeauchain.com and we will be happy to help you. Please note that this could incur an additional charge if it pushes you over your usage limits.";
            /* eslint-enable */
            this.setState({ errors: [message], btnLoading: false });
            return;
        }
        const url = `${ROASTER_URL(id)}/batches`;
        let body = { ...lotDetails };
        let respJSON = await requester({ url, body });
        if (respJSON instanceof Error) {
            this.setState({ errors: respJSON.response.data, btnLoading: false });
        } else {
            if (respJSON.redirect) {
                window.location.href = await respJSON.redirect_url;
            } else {
                this.getData(id);
            }
        }
    };

    // only called after successful submit
    // TODO, I dont think the try/catch will work like I want it to
    getData = async id => {
        const lotsUrl = `${ROASTER_URL(id)}/lots`;
        const batchesUrl = `${ROASTER_URL(id)}/batches`;
        const activityUrl = `${ROASTER_URL(id)}/subscriptions`;
        const logUrl = `${ROASTER_URL(id)}/lots_by_date`;
        const { updateLots, updateBatches, updateActivity, updateLog, closeModal } = this.props;
        try {
            const results = await Promise.all([
                fetcher(lotsUrl),
                fetcher(batchesUrl),
                fetcher(activityUrl),
                fetcher(logUrl)
            ]);
            Promise.all([
                updateLots({ data: results[0] }),
                updateBatches({ data: results[1] }),
                updateActivity({ data: results[2] }),
                updateLog({ data: results[3] })
            ]).then(() => closeModal());
        } catch (e) {
            // eslint-disable-next-line
            console.log(e);
        }
    };

    render() {
        const { id, lotData } = this.props;
        const { lotDetails, btnLoading, errors } = this.state;
        let on_hand = "?";
        if (lotDetails.lot_id) {
            const lot = lotData.find(lot => lot.id === lotDetails.lot_id);
            on_hand = lot.attributes.on_hand;
        }
        const btnActive = noEmpties(lotDetails);
        return (
            <Form onSubmit={this.startSubmit}>
                <ErrorHandler errors={errors} />
                <p>
                    <strong>Amount on hand: </strong>
                    {on_hand}
                    <F> lbs</F>
                </p>
                <Input
                    name="roast_date"
                    label="Date"
                    onChange={this.handleInputChange}
                    type="date"
                    defaultValue={lotDetails.roast_date}
                />
                <LotSelect roasterId={id} parentState={this.parentState} fluid />
                <Input
                    name="starting_amount"
                    label="Amount to be Roasted (in lbs)"
                    onChange={this.handleInputChange}
                    type="number"
                />
                <Button size="small" primary fluid loading={btnLoading} disabled={!btnActive}>
                    Start a Batch
                </Button>
            </Form>
        );
    }
}

const { oneOfType, string, number, func, object, array } = PropTypes;
StartBatch.propTypes = {
    id: oneOfType([number, string]),
    closeModal: func,
    updateLots: func,
    updateBatches: func,
    updateActivity: func,
    activity: object,
    lotData: array,
    updateLog: func
};

export default Wrapper;
