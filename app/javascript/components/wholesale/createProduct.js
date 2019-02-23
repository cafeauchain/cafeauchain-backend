import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Button, Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import { noEmpties } from "utilities";

import { requester, fetcher, roasterUrl as ROASTER_URL } from "utilities/apiUtils";

import Context from "contextsv2/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <CreateProduct
                {...props}
                id={ctx.userId}
                updateInventory={ctx.updateContext}
                inventoryData={ctx.inventory}
            />
        )}
    </Context>
);

const defaultDetails = {
    name: "",
    description: "",
    categories: [],
    product_images: [],
    composition: [{ inventory_item_id: undefined, pct: undefined }]
};
class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: defaultDetails,
            btnLoading: false,
            errors: []
        };
    }

    handleInputChange = (event, { value, name, checked, object, index }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        if (object && index !== undefined) {
            details[object][index][name] = val;
        } else {
            details[name] = val;
        }
        this.setState({ details, errors: [] });
    };

    startSubmit = ev => {
        ev.preventDefault();
        this.setState({ btnLoading: true }, this.handleSubmit);
    };

    handleSubmit = async () => {
        const { details } = this.state;
        const { id } = this.props;
        const url = `${ROASTER_URL(id)}/products`;
        let body = { ...details };
        let respJSON = await requester({ url, body });
        if (respJSON instanceof Error) {
            this.setState({ errors: respJSON.response.data, btnLoading: false });
        } else {
            if (respJSON.redirect) {
                window.location.href = await respJSON.redirect_url;
            } else {
                // eslint-disable-next-line
                // this.getData(id);
                // eslint-disable-next-line
                console.log("successful submit. now what?");
                // eslint-disable-next-line
                console.log(respJSON);
            }
        }
    };

    buildInventoryOptions = inventory =>
        inventory.map(({ id, attributes: { name, lot_name } }) => ({
            value: id,
            text: name + " (" + lot_name + ")",
            key: id,
            id,
            name
        }));

    addInventoryItem = () => {
        let { details } = this.state;
        const comp = { inventory_item_id: null, pct: null };
        details.composition = [...details.composition, comp];
        this.setState({ details });
    };
    render() {
        const { inventoryData } = this.props;
        const inventoryOptions = this.buildInventoryOptions(inventoryData);
        const { details, btnLoading, errors } = this.state;
        const { composition } = details;

        const compEmpties = composition.filter(item => noEmpties(item));
        const compTotal = composition.reduce((total, item) => {
            return total + Number(item.pct);
        }, 0);
        const btnActive = noEmpties(details) && compEmpties && compTotal === 100;
        return (
            <F>
                <Header as="h2" content="Create Product" />
                <Form onSubmit={this.startSubmit}>
                    <ErrorHandler errors={errors} />
                    <Input name="name" label="Product Name" onChange={this.handleInputChange} />
                    <Input
                        inputType="textarea"
                        name="description"
                        label="Product Description"
                        onChange={this.handleInputChange}
                    />
                    <Segment style={{ background: "#dedede" }}>
                        {composition.map((item, idx) => {
                            return (
                                // eslint-disable-next-line
                                <F key={idx}>
                                    <Header as="h4" content={"Inventory Item " + (idx + 1)} />
                                    <Input
                                        inputType="select"
                                        options={inventoryOptions}
                                        onChange={this.handleInputChange}
                                        name="inventory_item_id"
                                        object="composition"
                                        index={idx}
                                        label="Choose Inventory Item"
                                    />
                                    <Input
                                        name="pct"
                                        object="composition"
                                        index={idx}
                                        type="number"
                                        min="0"
                                        max="100"
                                        label="Composition %"
                                        onChange={this.handleInputChange}
                                    />
                                </F>
                            );
                        })}
                    </Segment>

                    <Button type="button" content="Add Product" onClick={this.addInventoryItem} />
                    <br />
                    <br />

                    <Button primary fluid loading={btnLoading} disabled={!btnActive}>
                        Create Product
                    </Button>
                </Form>
            </F>
        );
    }
}

const { oneOfType, string, number, array } = PropTypes;
CreateProduct.propTypes = {
    id: oneOfType([number, string]),
    inventoryData: array
};

export default Wrapper;
