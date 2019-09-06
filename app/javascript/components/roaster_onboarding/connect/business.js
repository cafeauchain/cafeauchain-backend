import React, { useState } from "react";
import PropTypes from "prop-types";
import { Segment, Button, Header, Divider, Form, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import Addresses from "shared/addresses";
import Flex from "shared/flex";
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import fields from "defs/forms/wholesaleSignup";

import defaults from "roaster_onboarding/connect/defaults";

import { underscorer, jsonToFormData, callMeDanger } from "utilities";
import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";
import { useHandleInput, useAfterSubmit } from "utilities/hooks";

import withContext from "contexts/withContext";
/* eslint-enable */

const Business = props => {
    let initdetails = { business: defaults.business };
    const { roaster, owner, addresses } = props;
    const roasterDefaults = {
        name: roaster.name,
        url: roaster.url,
        support_url: roaster.url,
        email: owner.email,
        address: addresses[0]
    };
    initdetails.business = {...initdetails.business, ...roasterDefaults };

    const [loading, updateLoading] = useState(false);
    const [errors, updateErrors] = useState([]);
    const { details, handleInputChange } = useHandleInput(initdetails);

    const callback = response => {
        const { updateContext } = props;
        updateContext({ roaster: response.roaster });
    };

    const errback = response => {
        const err = response.response;
        let array = err.message && typeof err.message === "string" ? [err.message] : err;
        if (!array || array.length === 0) array = ["Something went wrong"];
        updateErrors(array);
        updateLoading(false);
    };

    const handleSubmit = async e => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await updateLoading(true);
        await updateErrors([]);
        var form_data = jsonToFormData(details);
        const { userId } = props;
        const url = ROASTER_URL(userId) + "/wholesale_signup";

        const response = await requester({ url, body: form_data, noContentType: true });

        useAfterSubmit(response, callback, errback);
    };

    const { business } = details;
    return (
        <React.Fragment>
            <Segment padded="very">
                <Dimmer active={loading} inverted>
                    <Loader size="large">Processing</Loader>
                </Dimmer>
                <Header as="h3">Business Profile</Header>
                <Divider />
                    
                <Form>
                    <Segment>
                        <p>
                            {callMeDanger(`First, we need to gather some basic business information. 
                                We've pre-filled as much as we can buy please provide your legal company
                                name, tax id number, and banking information.`)}
                        </p>
                        <Flex spacing="10" wrap>
                            {fields.base.map(({ name: fieldName, label, flex, ...rest }) => {
                                const name = fieldName || underscorer(label);
                                return (
                                    <div key={name} flex={flex || "100"} style={{ marginBottom: "1em" }}>
                                        <Input
                                            {...rest}
                                            label={label}
                                            name={name}
                                            value={business[name]}
                                            data-namespace="business"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                );
                            })}
                        </Flex>
                        <Addresses
                            details={business.address}
                            onChange={(e, item) =>
                                handleInputChange(e, { ...item, "data-namespace": "business/address" })
                            }
                        />
                    </Segment>
                    <br />
                    <Divider />
                    <ErrorHandler errors={errors} />
                    <Flex spacing="20" spacebetween>
                        <div />
                        <div>
                            <Button
                                content="Continue to Opener Info"
                                icon="right arrow"
                                labelPosition="right"
                                primary
                                onClick={handleSubmit}
                            />
                        </div>
                    </Flex>
                </Form>
            </Segment>
        </React.Fragment>
    );
};

const { object, array, func, oneOfType, number, string } = PropTypes;
Business.propTypes = {
    owner: object,
    roaster: object,
    addresses: array,
    userId: oneOfType([ number, string ]),
    updateContext: func
};

export default withContext(Business);
