import React, { useState } from "react";
import PropTypes from "prop-types";
import { Segment, Button, Header, Divider, Form, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import Addresses from "shared/addresses";
import Flex from "shared/flex";
import Input from "shared/input";
import FileUpload from "shared/fileUpload";
import ErrorHandler from "shared/errorHandler";

import fields from "defs/forms/wholesaleSignup";

import defaults from "roaster_onboarding/connect/defaults";

import { underscorer, jsonToFormData, callMeDanger, flattenObj, noEmpties } from "utilities";
import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";
import { useHandleInput, useAfterSubmit } from "utilities/hooks";

import withContext from "contexts/withContext";
/* eslint-enable */

const reset = {
    owner: defaults.owner,
    owner_verification_back: null,
    owner_verification_front: null
};

const Owner = props => {
    let initdetails = reset;
    const { owner: owner_props } = props;
    let ownerName = owner_props.name.split(" ");

    const ownerDefaults = {
        first_name: ownerName[0],
        last_name: ownerName[1],
        email: owner_props.email
    };

    initdetails.owner = {
        ...initdetails.owner,
        ...ownerDefaults
    };

    const [loading, updateLoading] = useState(false);
    const [errors, updateErrors] = useState([]);
    const { details, handleInputChange, updateDetails } = useHandleInput(initdetails);

    const errback = response => {
        updateErrors(response.response.data);
        updateLoading(true);
    };
    const callback = response => {
        const { updateContext } = props;
        updateLoading(false);
        updateDetails(reset);
        updateContext({ roaster: response.roaster });
    };

    const validateInputs = (obj, exceptions = []) => {
        let inner = flattenObj(obj);
        let array = typeof exceptions === "string" ? [exceptions] : exceptions;
        array.forEach( exception => delete inner[exception] );
        return noEmpties(inner);
    };

    const handleAddAnother = async e => handleSubmit(e, "owner");
    const handleFinish = async e => handleSubmit(e, "enrolled");

    const handleSubmit = async (e, type) => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await updateLoading(true);
        await updateErrors([]);
        var form_data = jsonToFormData(details);
        const { userId } = props;
        const url = ROASTER_URL(userId) + "/wholesale_signup?submit_type=" + type;

        const response = await requester({ url, body: form_data, noContentType: true });

        useAfterSubmit(response, callback, errback);
    };

    

    const submitEnabled = validateInputs(details, ["street_2"]);
    console.log(submitEnabled);

    const { owner } = details;
    return (
        <React.Fragment>
            <Segment>
                <Dimmer active={loading} inverted>
                    <Loader size="large">Processing</Loader>
                </Dimmer>
                <Header as="h3">Beneficial Owner Information</Header>
                <Divider />
                <p>
                    {callMeDanger(`Finally, we need to gather information on all beneficial 
                        owners with a stake greater than or equal to 25%. Please complete all fields 
                        in order to avoid a delay in processing payments or withdrawing payouts.`)}
                </p>
                <Form>
                    <Segment>
                        <Flex spacing="10" wrap>
                            {fields.owner.map(({ name: fieldName, label, flex, ...rest }) => {
                                const name = fieldName || underscorer(label);
                                return (
                                    <div key={name} flex={flex || "100"} style={{ marginBottom: "1em" }}>
                                        <Input
                                            {...rest}
                                            label={label}
                                            name={name}
                                            value={owner[name]}
                                            data-namespace="owner"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                );
                            })}
                        </Flex>
                        <label style={{ fontSize: 13 }}>
                            <strong>Date of Birth</strong>
                        </label>
                        <Flex spacing="10">
                            {fields.dob.map(({ name, label, flex, ...rest }) => {
                                return (
                                    <div key={name} flex={flex || "100"} style={{ marginBottom: "1em" }}>
                                        <Input
                                            {...rest}
                                            label=""
                                            name={name}
                                            value={owner["dob"][name]}
                                            data-namespace="owner/dob"
                                            type="number"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                );
                            })}
                        </Flex>
                        <Addresses
                            details={owner.address}
                            onChange={(e, item) =>
                                handleInputChange(e, { ...item, "data-namespace": "owner/address" })
                            }
                        />
                        <p><strong>Owner Verification ID (required)</strong></p>
                        <p>
                            {callMeDanger(`In order to receive payouts, you will need to verify 
                                your identity with a state-issued ID or passport. Please upload an 
                                image of a valid ID.`)}
                        </p>
                        <Flex spacing="10">
                            <div flex="50">
                                <p><strong>Front</strong></p>
                                <FileUpload
                                    handleChange={handleInputChange}
                                    name="owner_verification_front"
                                    fileType="fileImage"
                                    id="owner_verification_front"
                                    files={details["owner_verification_front"] || []}
                                />
                            </div>
                            <div flex="50">
                                <p><strong>Back</strong></p>
                                <FileUpload
                                    handleChange={handleInputChange}
                                    name="owner_verification_back"
                                    fileType="fileImage"
                                    id="owner_verification_back"
                                    files={details["owner_verification_back"] || []}
                                />
                            </div>
                        </Flex>

                    </Segment>
                    <br />
                    <Divider />
                    <ErrorHandler errors={errors} />
                    <Flex spacing="20" spacebetween>
                        <div />
                        <div>
                            <Button
                                content="Add Another Owner"
                                onClick={handleAddAnother}
                                disabled={!submitEnabled}
                            />
                            <Button
                                content="Finish Wholesale Enrollment"
                                icon="right arrow"
                                labelPosition="right"
                                primary
                                onClick={handleFinish}
                                disabled={!submitEnabled}
                            />
                        </div>
                    </Flex>
                </Form>
            </Segment>
        </React.Fragment>
    );
};

const { object, func, oneOfType, number, string } = PropTypes;
Owner.propTypes = {
    owner: object,
    userId: oneOfType([number, string]),
    updateContext: func
};

export default withContext(Owner);
