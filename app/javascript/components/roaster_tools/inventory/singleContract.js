import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Button, Divider, Message } from "semantic-ui-react";

/* eslint-disable */
import ProducerSelect from "shared/producers/producerSelect";
import CropSelect from "shared/crops/cropSelect";
import Input from "shared/input";
import Flex from "shared/flex";

import fields from "defs/forms/addSingleContract";

import { url as API_URL, roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

const defaults = {
    producerId: "",
    lotDetails: {
        name: "",
        label: "",
        lot_size: "",
        price_per_pound: "",
        low_on_hand: "",
        low_remaining: "",
        on_hand: 0,
        roasted: 0
    },
    hiddenFields: true,
    btnLoading: false,
    crop_name: "",
    successMsg: ""
};

class SingleContract extends Component {
    constructor(props) {
        super(props);
        this.state = defaults;
        this.cropYears = this.getYears(4);
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
        let { lotDetails, crop_name } = this.state;
        lotDetails = { ...lotDetails };
        if (name === "") return;
        const val = value || checked;
        lotDetails[name] = val;
        if (name === "harvest_year") {
            lotDetails.name = crop_name + " " + value;
        }
        this.setState({ lotDetails });
    };

    handleSubmit = async ev => {
        const { target } = ev;
        ev.preventDefault();
        target.blur();
        await this.setState({ btnLoading: true });
        const { lotDetails } = this.state;
        const { userId, getData, successClose, closeModal } = this.props;
        const url = `${ROASTER_URL(userId)}/lots`;
        let body = { lotDetails };
        let respJSON = await requester({ url, body });
        if (respJSON instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", respJSON.response);
        } else {
            if (respJSON.redirect) {
                window.location.href = await respJSON.redirect_url;
            } else {
                getData("lots");
                const successMsg = "The new lot was created successfully!";
                await this.setState({ btnLoading: false });
                if (successClose) {
                    successClose(successMsg);
                } else if (closeModal) {
                    setTimeout(closeModal, 900);
                } else {
                    await this.setState({ successMsg });
                    setTimeout(() => this.setState(defaults), 1200);
                }
            }
        }
    };

    showHiddenFields = () => this.setState({ hiddenFields: false });

    getYears = num => {
        const start = new Date().getFullYear();
        const arr = [];
        for (let i = 0; i < num; i++) {
            const val = start - i;
            const options = { value: val + "", text: val, key: val };
            arr.push(options);
        }
        return arr;
    };

    render() {
        const { producerId, lotDetails, hiddenFields, btnLoading, successMsg } = this.state;
        return (
            <Form>
                {/* eslint-disable */}
                <p>
                    Add new contracts below. Get started by selecting your producer. If you don't see the one you need,
                    you can add it by typing the name and hitting enter. Then select the crop. Again, you can add it by
                    typing it in. Select your crop year and fill out the rest of the information. And if you've already
                    received or roasted any of this lot, you can include that information by clicking Existing
                    Quantities below.
                </p>
                {/* eslint-enable */}
                <ProducerSelect parentState={this.parentState} />
                {producerId && (
                    <F>
                        <CropSelect producerId={producerId} parentState={this.parentState} />
                        {lotDetails.crop_id && (
                            <Form.Dropdown
                                name="harvest_year"
                                fluid
                                selection
                                placeholder="Crop harvest year"
                                options={this.cropYears}
                                onChange={this.handleInputChange}
                            />
                        )}
                        <Divider />
                        {lotDetails.harvest_year && (
                            <F>
                                <Flex spacing="20" wrap>
                                    {fields.map(field => (
                                        <div
                                            key={field.name}
                                            flex="50"
                                            style={{
                                                marginBottom: 20,
                                                display: field.hidden && hiddenFields ? "none" : "block"
                                            }}
                                        >
                                            <Input
                                                name={field.name}
                                                icon={field.icon}
                                                iconPosition={field.icon ? "left" : undefined}
                                                fluid
                                                label={field.label}
                                                inputLabel={field.inputLabel}
                                                labelPosition={field.inputLabel ? "right" : undefined}
                                                placeholder={field.placeholder}
                                                onChange={this.handleInputChange}
                                                value={
                                                    lotDetails[field.name] === undefined ? "" : lotDetails[field.name]
                                                }
                                                type={field.type}
                                            />
                                        </div>
                                    ))}
                                </Flex>
                                {hiddenFields && (
                                    <Button
                                        className="unstyled"
                                        style={{ color: "green" }}
                                        content="Existing Quantities?"
                                        onClick={this.showHiddenFields}
                                        tabIndex={-1}
                                    />
                                )}
                                <br />
                                <br />
                                {successMsg && <Message positive>{successMsg}</Message>}
                                <Button fluid size="large" primary onClick={this.handleSubmit} loading={btnLoading}>
                                    Add Contract
                                </Button>
                            </F>
                        )}
                    </F>
                )}
            </Form>
        );
    }
}

const { oneOfType, string, number, func } = PropTypes;
SingleContract.propTypes = {
    userId: oneOfType([number, string]),
    getData: func,
    closeModal: func,
    successClose: func
};

export default withContext(SingleContract);
