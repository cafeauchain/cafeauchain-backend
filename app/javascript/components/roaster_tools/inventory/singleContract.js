import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Button, Divider } from "semantic-ui-react";

/* eslint-disable */
import ProducerSelect from "shared/producers/producerSelect";
import CropSelect from "shared/crops/cropSelect";
import Input from "shared/input";
import Flex from "shared/flex";

import fields from "defs/forms/addSingleContract";

import { url as API_URL, roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class SingleContract extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            producerId: "",
            lotDetails: {},
            hiddenFields: true,
            btnLoading: false
        };
        this.cropYears = this.getYears(4);
    }

    parentState = obj => {
        this.setState(obj);
    };

    handleInputChange = (event, { value, name, checked }) => {
        let { lotDetails } = this.state;
        lotDetails = { ...lotDetails };
        if (name === "") return;
        const val = value || checked;
        lotDetails[name] = val;
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
                const success = "The new lot was created successfully!";
                await this.setState({ btnLoading: false });
                if (successClose) {
                    successClose(success);
                } else if (closeModal) {
                    setTimeout(closeModal, 900);
                }
            }
        }
    };

    showHiddenFields = () => this.setState({ hiddenFields: false });

    // // only called after successful submit
    // getLotData = async id => {
    //     const url = `${API_URL}/roasters/${id}/lots`;
    //     const { updateContext, closeModal } = this.props;
    //     const response = await fetch(url);
    //     const { data } = await response.json();
    //     if (data instanceof Error) {
    //         // eslint-disable-next-line
    //         console.log("there was an error", data.response);
    //     } else {
    //         // TODO Add success/error messaging before closing
    //         await updateContext({ lots: data });
    //         closeModal();
    //     }
    // };

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
        const { producerId, lotDetails, hiddenFields, btnLoading } = this.state;
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
                                                defaultValue={field.defaultValue}
                                            />
                                        </div>
                                    ))}
                                </Flex>
                                {hiddenFields && (
                                    <Button
                                        className="unstyled"
                                        content="Existing Quantities?"
                                        onClick={this.showHiddenFields}
                                        tabIndex={-1}
                                    />
                                )}
                                <br />
                                <br />
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
