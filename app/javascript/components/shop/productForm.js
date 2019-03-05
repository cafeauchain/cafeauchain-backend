import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button, Card, Icon, Dimmer, Loader } from "semantic-ui-react";

import "./styles.scss";

/* eslint-disable */
import Flex from "shared/flex";
import Input from "shared/input";
import Modal from "shared/modal";
import { Weights, Money } from "shared/textFormatters";
import ErrorHandler from "shared/errorHandler";

import { requester, url as API_URL } from "utilities/apiUtils";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => <ProductForm {...props} loading={ctx.loading} userId={ctx.userId} getCtxData={ctx.getData} />}
    </Context>
);

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

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val;
        this.setState({ details, errors: [] });
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
        this.setState({ details, errors: [] });
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
        const { details } = this.state;
        const { getCtxData } = this.props;
        let url = `${API_URL}/carts`;
        if (method === "PUT") url += "/" + details.id;
        const response = await requester({ url, body: details, method });
        await setTimeout(() => this.setState({ btnLoading: false }), 600);
        if (response instanceof Error) {
            this.setState({ errors: response.response.data });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                this.setState({ added: true });
                if (method === "PUT") {
                    getCtxData("cart");
                }
            }
        }
    };

    handleDelete = async e => {
        const { target } = e;
        target.blur();
        e.preventDefault();
        await this.setState({ loading: true });
        const { cartId } = this.props;
        const { getCtxData } = this.props;
        const url = `${API_URL}/carts/${cartId}`;
        const response = await requester({ url, method: "DELETE" });
        await setTimeout(() => this.setState({ loading: false }), 600);
        if (response instanceof Error) {
            this.setState({ errors: response.response.data });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                // TODO This is not removing this component
                // because 'cart' is being SSR'ed instead of handled in context.
                // Figure out how get initial values from SSR and updated values from context
                // I could just hide it with css. It would be gone with the next page refresh...
                getCtxData("cart");
            }
        }
    };

    render() {
        const { variantOptions, productOptions, inCart } = this.props;
        const { errors, details, btnLoading, added, loading } = this.state;
        const selected = variantOptions.find(variant => variant.value === details.id);
        const subtotal = Number(details.quantity) * Number(selected.price);
        const multipleVariants = variantOptions.length > 1;
        return (
            <F>
                <Dimmer active={loading} inverted content={<Loader size="large" />} />
                <Card.Content extra>
                    <ErrorHandler errors={errors} />
                    {false && (
                        <F>
                            <Header as="h4" content="Pricing:" />
                            <div style={{ marginBottom: 10 }}>
                                {variantOptions.map(variant => (
                                    <Flex spacebetween key={variant.key} className="flex-striped">
                                        <span>
                                            <Weights>{variant.value}</Weights>
                                        </span>
                                        <Money>{variant.price}</Money>
                                    </Flex>
                                ))}
                            </div>
                        </F>
                    )}
                    {!inCart && (
                        <Flex spacing="10">
                            <div flex="50">
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
                            <div flex="50">
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
                            <input />
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
                            <Money type="positive">{subtotal}</Money>
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
                            <Button color="red" onClick={this.handleDelete} loading={btnLoading} content="Remove" />
                        )}
                    </Card.Header>
                </Card.Content>
            </F>
        );
    }
}

export default Wrapper;
