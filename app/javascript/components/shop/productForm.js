import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Button, Card, Icon, Dimmer, Loader } from "semantic-ui-react";

import "./styles.scss";

/* eslint-disable */
import Flex from "shared/flex";
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import Discounter from "shared/discounter";

import { requester, url as API_URL } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class ProductForm extends React.Component {
    static propTypes = () => {
        const { array, oneOfType, string, number } = PropTypes;
        return {
            variantOptions: array,
            productOptions: array,
            cartId: oneOfType([string, number])
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            details: {
                quantity: props.quantity || 1,
                id: props.variantOptions[0].value,
                option: props.productOptions[0].value
            },
            errors: [],
            btnLoading: false,
            added: false,
            loading: false
        };
    }

    componentDidUpdate(props){
        const { cart: { attributes: { total_weight: old_weight } }, inCart, updateContext } = props;
        const { cart: { attributes: { total_weight: new_weight } } } = this.props;
        if( old_weight !== new_weight && inCart ){
            // eslint-disable-next-line no-console
            console.log( 'trigger an update for rates' );
            updateContext({ fetchRates: true });
        }
    }

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details, errors: [], added: false });
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
        this.setState({ details, errors: [], added: false });
    };

    handleSubmit = e => {
        this.onSubmit(e, "POST");
    };

    handleUpdate = e => {
        this.onSubmit(e, "PUT");
    };

    onSubmit = async (e, method) => {
        const { target } = e;
        target.blur();
        e.preventDefault();
        await this.setState({ btnLoading: true });
        let { details } = this.state;
        const { getData, isAssumedCustomer, customer, updateContext } = this.props;
        await updateContext({ cartLoading: true });
        let url = `${API_URL}/carts`;
        if (method === "PUT") url += "/" + details.id;
        if( isAssumedCustomer ){
            details.customer_profile_id = customer.id;
        }
        const response = await requester({ url, body: details, method });
        
        if (response instanceof Error) {
            await setTimeout(async () => this.setState({ btnLoading: false }), 600);
            this.setState({ errors: response.response.data });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                setTimeout( async() => {
                    await getData("cart", isAssumedCustomer ? `?customer_profile_id=${customer.id}` : "");
                    await updateContext({ cartLoading: false });
                    this.setState({ btnLoading: false, added: true });
                }, 600 );
            }
        }
    };

    handleDelete = async e => {
        const { target } = e;
        target.blur();
        e.preventDefault();
        await this.setState({ loading: true });
        const { cartId } = this.props;
        const { getData } = this.props;
        const url = `${API_URL}/carts/${cartId}`;
        const response = await requester({ url, method: "DELETE" });
        if (response instanceof Error) {
            setTimeout(() => this.setState({ errors: response.response.data, loading: false }), 600);
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                setTimeout(() => getData("cart"), 600);
            }
        }
    };

    render() {
        const { variantOptions, productOptions, inCart } = this.props;
        const { errors, details, btnLoading, added, loading } = this.state;
        const selected = variantOptions.find(variant => variant.value === details.id);
        const subtotal = Number(details.quantity) * Number(selected.price);
        const disc_subtotal = Number(details.quantity) * Number(selected.discounted_price);
        const multipleVariants = variantOptions.length > 1;
        return (
            <F>
                <Dimmer active={loading} inverted content={<Loader size="large" />} />
                <Card.Content extra>
                    <ErrorHandler errors={errors} />
                    {!inCart && (
                        <Flex spacing="10" wrap>
                            <div flex="50" className="product-select">
                                <Input
                                    inputType={multipleVariants ? "select" : undefined}
                                    options={multipleVariants ? variantOptions : undefined}
                                    label="Size"
                                    name="id"
                                    value={multipleVariants ? details.id : variantOptions[0].text}
                                    onChange={multipleVariants ? this.handleInputChange : undefined}
                                    readOnly={multipleVariants ? undefined : true}
                                />
                            </div>
                            <div flex="50" className="product-select">
                                <Input
                                    label="Option"
                                    inputType="select"
                                    options={productOptions}
                                    value={details.option}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </Flex>
                    )}

                    <Card.Description>
                        <Input
                            action
                            label="Quantity"
                            type="number"
                            onChange={this.handleInputChange}
                            value={details.quantity}
                            allowLP
                        >
                            <Button
                                type="button"
                                style={{ background: "#eaeaea" }}
                                icon
                                content={<Icon name="minus" />}
                                compact
                                disabled={Number(details.quantity) === 0}
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
                    </Card.Description>
                    <br />
                    <Card.Header>
                        <Flex spacebetween>
                            <span>Subtotal: </span>
                            <div>
                                <Discounter original={subtotal} discount={disc_subtotal} linebreak />
                            </div> 
                        </Flex>
                        <br />
                        <Button
                            primary
                            floated="right"
                            onClick={inCart ? this.handleUpdate : this.handleSubmit}
                            loading={btnLoading}
                        >
                            {added ? (
                                <F>
                                    {inCart ? "Updated  " : "Added  "}
                                    <Icon name="check" className="button" />
                                </F>
                            ) : (
                                <F>
                                    <Icon name="cart plus" />
                                    {inCart ? "Update Cart" : "Add to Cart"}
                                </F>
                            )}
                        </Button>
                        {inCart && (
                            <Button
                                color="red"
                                inverted
                                onClick={this.handleDelete}
                                loading={btnLoading}
                                content="Remove"
                            />
                        )}
                    </Card.Header>
                </Card.Content>
            </F>
        );
    }
}

export default withContext(ProductForm);
