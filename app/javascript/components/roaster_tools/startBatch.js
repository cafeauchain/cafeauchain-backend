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

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <StartBatch
                {...props}
                id={ctx.userId}
                updateContext={ctx.updateContext}
                lotData={ctx.lots}
                inventory={ctx.inventory}
                getCtxData={ctx.getData}
            />
        )}
    </Context>
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
    componentDidMount() {
        const { lotData, inventory, getCtxData } = this.props;
        if (lotData === undefined) {
            getCtxData("lots");
        }
        if (inventory === undefined) {
            getCtxData("inventory");
        }
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
        const { id } = this.props;
        // TODO Move this validation to the backend
        // const { id, activity } = this.props;
        // const { attributes } = activity;
        // if (moment(attributes.period_start_date).isAfter(lotDetails.roast_date, "day")) {
        /* eslint-disable */
        //     const message =
        //         "You are trying to create a roast for a previous billing period. If you need to add a roast from a previous period, please email us at support@cafeauchain.com and we will be happy to help you. Please note that this could incur an additional charge if it pushes you over your usage limits.";
        //     /* eslint-enable */
        //     this.setState({ errors: [message], btnLoading: false });
        //     return;
        // }
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
        const baseUrl = ROASTER_URL(id);
        const requests = [
            { name: "lots", url: `${baseUrl}/lots` },
            { name: "batches", url: `${baseUrl}/batches` },
            { name: "activity", url: `${baseUrl}/subscriptions` },
            { name: "log", url: `${baseUrl}/lots_by_date` }
        ];
        const { updateContext, closeModal } = this.props;
        try {
            const results = await Promise.all(requests.map(request => fetcher(request.url)));
            Promise.all(results.map((result, idx) => updateContext({ [requests[idx].name]: result }))).then(() =>
                closeModal()
            );
        } catch (e) {
            // eslint-disable-next-line
            console.log(e);
        }
    };

    buildInventoryOptions = (inventory, lotId) => {
        return inventory.reduce((options, { id, attributes }) => {
            if (attributes.lot_id === lotId) {
                return [...options, { value: id, key: id, text: attributes.name }];
            }
            return options;
        }, []);
    };

    buildLotOptions = lots =>
        lots.map(({ id, attributes: { name } }) => ({ value: id, text: name, key: id, id, name }));

    render() {
        let { id, lotData, inventory } = this.props;
        if (lotData === undefined) lotData = [];
        if (inventory === undefined) inventory = [];
        const lotOptions = this.buildLotOptions(lotData);
        const { lotDetails, btnLoading, errors } = this.state;
        const isLotSelected = lotDetails.lot_id;
        let on_hand = "?";
        let inventoryItems = [];
        if (isLotSelected) {
            const lot = lotData.find(lot => lot.id === lotDetails.lot_id);
            on_hand = lot.attributes.on_hand;
            inventoryItems = this.buildInventoryOptions(inventory, lotDetails.lot_id);
        }
        const btnActive = noEmpties(lotDetails);
        return (
            <Form onSubmit={this.startSubmit}>
                <ErrorHandler errors={errors} />
                <Input
                    name="roast_date"
                    label="Date"
                    onChange={this.handleInputChange}
                    type="date"
                    defaultValue={lotDetails.roast_date}
                />
                <Input
                    inputType="select"
                    options={lotOptions}
                    onChange={this.handleInputChange}
                    name="lot_id"
                    label="Choose Lot"
                />
                {isLotSelected && (
                    <F>
                        <p>
                            <strong>Amount on hand: </strong>
                            {on_hand}
                            <F> lbs</F>
                        </p>
                        <Input
                            inputType="select"
                            label="Roast Profile"
                            options={inventoryItems}
                            onChange={this.handleInputChange}
                            name="inventory_item_id"
                        />
                        <Input
                            name="starting_amount"
                            label="Amount to be Roasted (in lbs)"
                            onChange={this.handleInputChange}
                            type="number"
                        />
                        <Button size="small" primary fluid loading={btnLoading} disabled={!btnActive}>
                            Start a Batch
                        </Button>
                    </F>
                )}
            </Form>
        );
    }
}

const { oneOfType, string, number, func, object, array } = PropTypes;
StartBatch.propTypes = {
    id: oneOfType([number, string]),
    closeModal: func,
    updateContext: func,
    lotData: array,
    inventory: array,
    getCtxData: func
};

export default Wrapper;
