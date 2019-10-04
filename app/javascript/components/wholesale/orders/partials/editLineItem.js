import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
import { Weights } from "shared/textFormatters";

import { humanize } from "utilities";
/* eslint-enable */

class LineItem extends Component {
    constructor(props){
        super(props);
        const { current } = props;
        this.state = {
            details: {
                id: current ? current.id : "",
                name: current ? current.name : "",
                production_options: current ? current.production_options : [],
                variant_id: current ? current.variant_id : "",
                size: current ? current.size : "",
                unit_price: current ? current.unit_price : "",
                total_price: current ? current.total_price : "",
                quantity: current ? current.quantity : 1
            }
        };
    }

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        if( name === "variant_id" ){
            const item = this.buildProducts().find( itm => itm.id === value );
            details.id = item.id;
            details.name = item.title;
            details.size = item.size;
            details.unit_price = item.unit_price;
        }
        details.total_price = Number(details.quantity) * Number(details.unit_price);
        if( name === "production_options" ) {
            details.production_options = [value];
        }
        this.setState({ details });
    };

    decrementQty = event => {
        event.preventDefault();
        this.changeQty(-1);
    };

    incrementQty = event => {
        event.preventDefault();
        this.changeQty(1);
    };

    changeQty = dir => {
        let { details } = this.state;
        details = { ...details };
        details.quantity = Number(details.quantity) + dir;
        details.total_price = details.quantity * details.unit_price;
        this.setState({ details });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        const { updateLineItems, successClose } = this.props;
        const { details } = this.state; 
        updateLineItems(details);
        if( successClose ){
            successClose(`${details.name} (${humanize(details.production_options.toString())}) was updated!`);
        }
    }

    handleDelete = e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        const { updateLineItems, successClose } = this.props;
        const { details } = this.state;
        details.shouldDelete = true;
        updateLineItems(details);
        if (successClose) {
            successClose(`${details.name} (${humanize(details.production_options.toString())}) was deleted!`);
        }
    }

    buildProducts = () => {
        const { products } = this.props;
        const variants = products.reduce((arr,product) => {
            let pv = product.attributes.variants.map(variant => {
                const weight = Weights({ content: variant.size });
                const price = "$" + variant.price_in_dollars;
                const text = product.attributes.title + " - " + weight + " (" + price + ")";
                return {
                    text: text,
                    id: variant.id,
                    value: variant.id,
                    key: variant.id,
                    title: product.attributes.title,
                    unit_price: variant.price_in_dollars,
                    size: variant.size,
                    options: product.attributes.product_options
                };
            });
            return arr.concat(pv);
        },[]);
        return variants;
    }

    buildOptions = variant_id => {
        const variant = this.buildProducts().find(item => item.id === variant_id);
        return variant.options.map( item => {
            return {
                text: humanize(item),
                value: item,
                id: item,
                key: item
            };
        });
    }

    render() {
        const { closeModal, products = [], current } = this.props;
        const { details: { quantity, name, production_options, size, variant_id } } = this.state;
        const btnDisabled = !variant_id || !production_options.length || !quantity || Number(quantity) < 1;
        return (
            <div>
                {current &&  (
                    <Fragment>
                        <div>{`Product: ${name}`}</div>
                        <div>
                            <span>Bag Size: </span>
                            <Weights>{size}</Weights>
                        </div>
                        <div>{`Options: ${humanize(production_options.toString())}`}</div>
                    </Fragment>
                )}
                {(products && products.length > 0) && (
                    <Fragment>
                        <Input
                            inputType="select"
                            options={this.buildProducts()}
                            label="Choose a Product"
                            onChange={this.handleInputChange}
                            name="variant_id"
                            value={variant_id}
                        />
                        {!!variant_id && (
                            <Fragment>
                                <br />
                                <Input
                                    inputType="select"
                                    options={this.buildOptions(variant_id)}
                                    label="Choose an Option"
                                    onChange={this.handleInputChange}
                                    name="production_options"
                                    value={production_options[0]}
                                />  
                            </Fragment>
                        )}
                    </Fragment>                    
                )}
                <br />
                <Input
                    action
                    label="Quantity"
                    type="number"
                    onChange={this.handleInputChange}
                    value={quantity}
                    allowLP
                >
                    <Button
                        type="button"
                        style={{ background: "#eaeaea" }}
                        icon
                        content={<Icon name="minus" />}
                        compact
                        disabled={Number(quantity) === 1}
                        onClick={this.decrementQty}
                    />
                    <input data-lpignore="true" />
                    <Button
                        type="button"
                        primary
                        icon
                        content={<Icon name="plus" />}
                        compact
                        onClick={this.incrementQty}
                    />
                </Input>
                <br />
                <Flex spacebetween>
                    <div>
                        <Button negative content="Delete" onClick={this.handleDelete} />
                    </div>
                    <div>
                        <Button negative basic content="Cancel" onClick={closeModal} />
                        <Button primary content="Update Invoice" onClick={this.handleSubmit} disabled={btnDisabled}  />
                    </div>
                    
                </Flex>
            </div>
        );
    }
}

const { object, func, array } = PropTypes;
LineItem.propTypes = {
    current: object,
    updateLineItems: func,
    successClose: func,
    closeModal: func,
    products: array
};

export default LineItem;
