import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button, Card, Image, Icon } from "semantic-ui-react";

import "./styles.scss";

/* eslint-disable */
import Table from "shared/table";
import Flex from "shared/flex";
import Input from "shared/input";
import Modal from "shared/modal";
import { Weights, Money } from "shared/textFormatters";
import ErrorHandler from "shared/errorHandler";

import tableDefs from "defs/tables/roastedInventory";

import { sortBy, truncate, callMeDanger } from "utilities";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => <Products {...props} loading={ctx.loading} userId={ctx.userId} getCtxData={ctx.getData} />}
    </Context>
);

class Products extends React.Component {
    static propTypes = () => {
        const { array, oneOfType, string, number, node } = PropTypes;
        return {
            id: oneOfType([string, number]),
            img: node,
            title: string,
            description: string,
            shortDesc: string,
            variantOptions: array,
            grindOptions: array
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            details: {
                id: props.id,
                quantity: 1,
                size: props.variantOptions[0].value,
                grind: props.grindOptions[0].value
            },
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
        e.preventDefault();
        const { details } = this.state;
        // eslint-disable-next-line
        console.log(details);
    };

    render() {
        const { img, title, description, shortDesc, variantOptions, grindOptions } = this.props;
        const { errors, details } = this.state;
        const selected = variantOptions.find(variant => variant.value === details.size);
        const subtotal = Number(details.quantity) * Number(selected.price);
        const multipleVariants = variantOptions.length > 1;
        return (
            <F>
                <ErrorHandler errors={errors} />
                <Card className="flex-card">
                    <Image src={img} as="div" className="card-image-container" />
                    <Card.Content>
                        <Card.Header>{title}</Card.Header>
                        <Card.Meta>Coffee Profile</Card.Meta>
                        <Card.Description title={description}>
                            {shortDesc}
                            <br />
                            <a href="/cart">More Info</a>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
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

                        <Flex spacing="10">
                            <div flex="50">
                                <Input
                                    inputType={multipleVariants ? "select" : undefined}
                                    options={multipleVariants ? variantOptions : undefined}
                                    label="Size"
                                    value={multipleVariants ? details.size : variantOptions[0].text}
                                    onChange={multipleVariants ? this.handleInputChange : undefined}
                                    readOnly={multipleVariants ? undefined : true}
                                />
                            </div>
                            <div flex="50">
                                <Input
                                    label="Grind"
                                    inputType="select"
                                    options={grindOptions}
                                    value={details.grind}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </Flex>
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
                            <Button primary floated="right" onClick={this.handleSubmit}>
                                <Icon name="cart plus" />
                                Add To Cart
                            </Button>
                        </Card.Header>
                    </Card.Content>
                </Card>
            </F>
        );
    }
}

export default Wrapper;
