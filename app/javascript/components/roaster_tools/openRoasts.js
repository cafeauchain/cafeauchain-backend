import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Modal, Button, Form } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Input from "shared/input";
import Flex from "shared/flex";

import tableDefs from "defs/tables/openRoasts";

import { url as API_URL, requester } from "utilities/apiUtils";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <OpenRoasts
                {...props}
                batches={ctx.batches}
                loading={ctx.loading}
                updateContext={ctx.updateContext}
                inventory={ctx.inventory}
                userId={ctx.userId}
                getCtxData={ctx.getData}
            />
        )}
    </Context>
);

class OpenRoasts extends Component {
    state = {
        isOpen: false,
        current: {},
        details: {}
    };

    componentDidMount() {
        const { batches, inventory, getCtxData } = this.props;
        if (batches === undefined) getCtxData("batches");
        if (inventory === undefined) getCtxData("inventory");
    }

    closeModal = () => this.setState({ isOpen: false, current: {}, details: {} });

    onClick = (e, item) => {
        const { attributes } = item;
        this.setState({
            isOpen: true,
            current: item,
            details: {
                ending_amount: (Number(attributes.starting_amount) * 0.9).toFixed(2),
                starting_amount: attributes.starting_amount,
                inventory_item_id: attributes.inventory_item_id,
                roast_date: attributes.roast_date
            }
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

    handleSubmit = async (ev, isFinished) => {
        ev.preventDefault();
        const { details, current } = this.state;
        const { id, attributes } = current;
        const { userId } = this.props;
        const url = `${API_URL}/roasters/${userId}/batches/${id}`;
        if (isFinished) {
            details.finish_batch = true;
        }
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

    handleFinish = ev => this.handleSubmit(ev, true);
    handleUpdate = ev => this.handleSubmit(ev, false);

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
            await updateContext({ batches: data });
            this.closeModal();
        }
    };

    buildInventoryOptions = (inventory, lot_id) => {
        return inventory.reduce((options, { id, attributes }) => {
            if (lot_id.toString() === attributes.lot_id.toString()) {
                return [
                    ...options,
                    {
                        value: id,
                        text: attributes.name,
                        key: id,
                        id: id,
                        name: attributes.name
                    }
                ];
            }
            return options;
        }, []);
    };

    renderForm = () => {
        const { current, details } = this.state;
        let { inventory } = this.props;
        if (inventory === undefined) inventory = [];
        const { attributes } = current;
        return (
            <Form>
                <F>
                    <Input
                        name="roast_date"
                        label="Roast Date"
                        onChange={this.handleInputChange}
                        type="date"
                        value={details.roast_date}
                    />
                    <Input
                        inputType="select"
                        name="inventory_item_id"
                        label="Roast Profile"
                        onChange={this.handleInputChange}
                        defaultValue={details.inventory_item_id.toString()}
                        options={this.buildInventoryOptions(inventory, attributes.lot_id)}
                    />

                    <Input
                        name="starting_amount"
                        label="Starting Weight (in lbs)"
                        onChange={this.handleInputChange}
                        type="number"
                        defaultValue={details.starting_amount}
                    />

                    <Input
                        key="ending_amount"
                        name="ending_amount"
                        label="Roasted Yield (in lbs)"
                        onChange={this.handleInputChange}
                        type="number"
                        defaultValue={details.ending_amount}
                        step={0.1}
                    />
                    <Flex spacebetween>
                        <Button onClick={this.handleUpdate}>Update Batch</Button>
                        <Button primary onClick={this.handleFinish}>
                            Finish Batch
                        </Button>
                    </Flex>
                </F>
            </Form>
        );
    };

    render() {
        const { loading } = this.props;
        let { batches } = this.props;
        if (batches === undefined) batches = [];
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
    userId: oneOfType([string, number]),
    inventory: array,
    getCtxData: func
};

export default Wrapper;
