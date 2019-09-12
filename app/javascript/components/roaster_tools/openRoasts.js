import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Modal, Button, Form } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Input from "shared/input";
import Flex from "shared/flex";

import tableDefs from "defs/tables/openRoasts";

import { roasterUrl as ROASTER_URL,  requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class OpenRoasts extends Component {
    state = {
        isOpen: false,
        current: {},
        details: {}
    };

    componentDidMount() {
        const { batches, inventory, getData } = this.props;
        if (batches === undefined) getData("batches");
        if (inventory === undefined) getData("inventory");
    }

    closeModal = () => this.setState({ isOpen: false, current: {}, details: {} });

    onClick = (e, item) => {
        const { attributes } = item;
        const start = Number(attributes.starting_amount);
        const pct = (1 - Number(attributes.shrinkage)/100);
        const end = Number((start * pct).toFixed(2));
        this.setState({
            isOpen: true,
            current: item,
            details: {
                ending_amount: end,
                starting_amount: start,
                inventory_item_id: attributes.inventory_item_id,
                roast_date: attributes.roast_date,
                roast_size: attributes.roast_size,
                roast_count: attributes.roast_count,
                shrinkage: attributes.shrinkage
            }
        });
    };

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        if (name === "roast_count" || name === "roast_size" ) {
            const start = (details["roast_count"] * details["roast_size"]).toFixed(2);
            const pct = 1 - Number(details["shrinkage"]) / 100;
            details["starting_amount"] = Number(start);
            details["ending_amount"] = Number((Number(pct) * Number(start)).toFixed(2));
        }
        this.setState({ details });
    };

    handleSubmit = async (ev, isFinished) => {
        ev.preventDefault();
        const { details, current: { id } } = this.state;
        const { userId } = this.props;
        const url = `${ ROASTER_URL( userId) }/batches/${ id }`;
        if (isFinished) {
            details.finish_batch = true;
        }
        const body = { ...details };
        const method = "PUT";
        // TODO probably need to add in better error handler/input validation
        if (Number(details.ending_amount) > Number(details.starting_amount)) {
            alert("Your ending amount is more than your green coffee weight.");
            return;
        }

        let response = await requester({ url, body, method });
        this.afterSubmit({ response, isFinished });
    };

    handleFinish = ev => this.handleSubmit(ev, true);
    handleUpdate = ev => this.handleSubmit(ev, false);

    handleDelete = async ev => {
        ev.preventDefault();
        const { current: { id } } = this.state;
        const { userId } = this.props;
        const url = `${ROASTER_URL(userId)}/batches/${id}`;
        let response = await requester({ url, method: "DELETE" });
        this.afterSubmit({ response, isDelete: true });
    }

    afterSubmit = async ({response, isFinished, isDelete}) => {
        const { getData } = this.props;
        if (response instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", response.response);
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                if( isFinished ){
                    await getData("batches");
                    await getData("inventory");
                    await getData("log");
                    await getData("activity");
                }
                if( isDelete ){
                    await getData("batches");
                }
                this.closeModal();
            }
        }
    }

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
                        value={details.inventory_item_id.toString()}
                        options={this.buildInventoryOptions(inventory, attributes.lot_id)}
                    />
                    <Input 
                        name="roast_count"
                        label="Number of Roasts"
                        onChange={this.handleInputChange}
                        value={details.roast_count}
                        type="number"
                    />
                    <Input 
                        name="roast_size"
                        label="Roast Size"
                        onChange={this.handleInputChange}
                        value={details.roast_size}
                        type="number"
                    />

                    <Input
                        name="starting_amount"
                        label="Starting Weight (in lbs)"
                        onChange={this.handleInputChange}
                        type="number"
                        value={details.starting_amount}
                    />

                    <Input
                        key="ending_amount"
                        name="ending_amount"
                        label="Roasted Yield (in lbs)"
                        onChange={this.handleInputChange}
                        type="number"
                        value={details.ending_amount}
                        step={0.1}
                    />
                    <Flex spacebetween>
                        <div />
                        <Button negative content="Delete Batch" onClick={this.handleDelete} />
                    </Flex>
                    <br />
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
                <Table tableDefs={tableDefs} data={batches} loading={loading} onClick={this.onClick} />
            </F>
        );
    }
}

const { array, bool, func, oneOfType, string, number } = PropTypes;
OpenRoasts.propTypes = {
    batches: array,
    loading: bool,
    userId: oneOfType([string, number]),
    inventory: array,
    getData: func
};

export default withContext(OpenRoasts);
