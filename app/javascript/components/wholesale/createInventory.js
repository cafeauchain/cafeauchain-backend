import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Button, Header } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import { noEmpties } from "utilities";

import { requester, fetcher, roasterUrl as ROASTER_URL } from "utilities/apiUtils";

import Lots from "contexts/lots";
import Context from "contextsv2/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => <CreateInventory {...props} id={ctx.userId} updateInventory={ctx.updateContext} lotData={ctx.lots} />}
    </Context>
);

const defaultDetails = {
    quantity: 0,
    lot_id: null,
    name: "",
    par_level: null
};
class CreateInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: defaultDetails,
            btnLoading: false,
            errors: []
        };
    }

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val;
        this.setState({ details, errors: [] });
    };

    startSubmit = ev => {
        ev.preventDefault();
        this.setState({ btnLoading: true }, this.handleSubmit);
    };

    handleSubmit = async () => {
        const { details } = this.state;
        const { id } = this.props;
        const url = `${ROASTER_URL(id)}/inventory_items`;
        let body = { ...details };
        let respJSON = await requester({ url, body });
        if (respJSON instanceof Error) {
            this.setState({ errors: respJSON.response.data, btnLoading: false });
        } else {
            if (respJSON.redirect) {
                window.location.href = await respJSON.redirect_url;
            } else {
                // eslint-disable-next-line
                this.getData(id);
            }
        }
    };

    // only called after successful submit
    // TODO, I dont think the try/catch will work like I want it to
    getData = async id => {
        const inventoryUrl = `${ROASTER_URL(id)}/inventory_items`;
        const { updateInventory, closeModal } = this.props;
        try {
            const results = await Promise.all([fetcher(inventoryUrl)]);
            Promise.all([updateInventory({ inventory: results[0] })]).then(() => {
                if (closeModal) {
                    closeModal();
                } else {
                    this.setState({
                        btnLoading: false,
                        details: defaultDetails
                    });
                }
            });
        } catch (e) {
            // eslint-disable-next-line
            console.log(e);
        }
    };

    buildLotOptions = lots =>
        lots.map(({ id, attributes: { name } }) => ({ value: id, text: name, key: id, id, name }));

    render() {
        const { lotData } = this.props;
        const lotOptions = this.buildLotOptions(lotData);
        const { details, btnLoading, errors } = this.state;
        const isLotSelected = details.lot_id;
        const btnActive = noEmpties(details);
        return (
            <F>
                <Header as="h2" content="Add Inventory Item" />
                <Form onSubmit={this.startSubmit}>
                    <ErrorHandler errors={errors} />
                    <Input
                        inputType="select"
                        options={lotOptions}
                        onChange={this.handleInputChange}
                        name="lot_id"
                        label="Choose Lot"
                    />
                    {isLotSelected && (
                        <F>
                            <Input name="name" label="Roast Profile" onChange={this.handleInputChange} />
                            <Input name="par_level" label="Par Level" onChange={this.handleInputChange} />
                            <Input
                                name="quantity"
                                label="Starting Quantity"
                                onChange={this.handleInputChange}
                                defaultValue={0}
                            />

                            <Button size="small" primary fluid loading={btnLoading} disabled={!btnActive}>
                                Create Inventory Item
                            </Button>
                        </F>
                    )}
                </Form>
            </F>
        );
    }
}

const { oneOfType, string, number, func, array } = PropTypes;
CreateInventory.propTypes = {
    id: oneOfType([number, string]),
    closeModal: func,
    updateInventory: func,
    lotData: array
};

export default Wrapper;
