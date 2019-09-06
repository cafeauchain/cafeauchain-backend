import React, { useState } from "react";
import PropTypes from "prop-types";
import { Segment, Button, Header, Divider, Form } from "semantic-ui-react";

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
    ...defaults.person,
    verification_back: null,
    verification_front: null
};

const hardreset = JSON.stringify(reset);

const Owner = props => {
    let initdetails = {...reset};
    const { owner, updateContext, isOpener, userId } = props;
    let ownerName = owner.name.split(" ");

    const ownerDefaults = {
        first_name: isOpener ? ownerName[0] : "",
        last_name: isOpener ? ownerName[1] : "",
        email: isOpener ? owner.email : ""
    };

    initdetails = {
        ...initdetails,
        ...ownerDefaults
    };

    if( isOpener ){
        initdetails = {
            ...initdetails,
            isOwner: isOpener ? "no" : undefined,
            isOnlyOwner: isOpener ? "no" : undefined
        };
    }

    const [loading, updateLoading] = useState(false);
    const [errors, updateErrors] = useState([]);
    const { details, handleInputChange, updateDetails } = useHandleInput(initdetails);

    const errback = response => {
        const err = response.response;
        let array = err.message && typeof err.message === "string" ? [err.message] : err;
        if( !array || array.length === 0 ) array = ["Something went wrong"];
        updateErrors(array);
        updateLoading(false);
    };
    const callback = response => {
        updateLoading(false);
        const resetter = JSON.parse(hardreset);
        updateDetails(resetter);
        updateContext({ roaster: response.roaster });
    };

    const validateInputs = (obj, skips = []) => {
        let inner = flattenObj(obj);
        let array = typeof skips === "string" ? [skips] : skips;
        array.forEach(skip => delete inner[skip] );
        return noEmpties(inner);
    };

    const handleAddOwner = e => handleSubmit(e, "opener");
    const handleOnlyOwner = e => handleSubmit(e, "only_owner");
    const handleAddAnother = e => handleSubmit(e, "owner");
    const handleFinish = e => handleSubmit(e, "enrolled");

    const handleSubmit = async (e, type) => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await updateLoading(true);
        await updateErrors([]);
        var form_data = jsonToFormData(details);
        const url = ROASTER_URL(userId) + "/wholesale_signup?submit_type=" + type;

        const response = await requester({ url, body: form_data, noContentType: true });

        useAfterSubmit(response, callback, errback);
    };

    const submitEnabled = validateInputs(details, ["street_2"]);

    const openerIsOwner_options = [
        { label: "Yes", value: "yes", checked: details.isOwner === "yes" },
        { label: "No", value: "no", checked: details.isOwner === "no" }
    ];
    const openerIsOnlyOwner_options = [
        { label: "Yes", value: "yes", checked: details.isOnlyOwner === "yes" },
        { label: "No", value: "no", checked: details.isOnlyOwner === "no" }
    ];

    const onlyOwner = details.isOnlyOwner === "yes" && details.isOwner === "yes";

    return (
        <React.Fragment>
            <Segment padded>
                <Header as="h3">{isOpener ? "Account Opener" : "Beneficial Owner Information"}</Header>
                <Divider />
                {isOpener && (
                    <p>
                        {callMeDanger(`Next, we need to collect some information on the person actually 
                            opening the account. This can be an owner, executive, or director.`)}
                    </p>
                )}
                {!isOpener && (
                    <p>
                        {callMeDanger(`Finally, we need to gather information on all beneficial 
                            owners with a stake greater than or equal to 25%. Please complete all fields 
                            in order to avoid a delay in processing payments or withdrawing payouts.`)}
                    </p>
                )}
                <Form>
                    <Segment>
                        {isOpener && (
                            <>
                                <Segment color="green">
                                    <Header as="h4" content="Ownership Info" />
                                    <p>
                                        {callMeDanger(`Is the account opener a beneficial owner (having an ownership 
                                            stake of 25% or more)?`)}
                                    </p>
                                    <Input
                                        inputType="radio"
                                        label=""
                                        name="isOwner"
                                        dataArray={openerIsOwner_options}
                                        onChange={handleInputChange}
                                    />
                                    {details.isOwner === "yes" && (
                                        <>
                                            <p>
                                                {callMeDanger(`Is this beneficial owner the <strong>ONLY</strong> 
                                                    beneficial owner (having an ownership stake of 25 % or more)?`)}
                                            </p>
                                            <Input
                                                inputType="radio"
                                                label=""
                                                name="isOnlyOwner"
                                                dataArray={openerIsOnlyOwner_options}
                                                onChange={handleInputChange}
                                            />
                                        </>
                                    )}
                                </Segment>
                            </>
                        )}
                        
                        <Flex spacing="10" wrap>
                            {fields.person.map(({ name: fieldName, label, flex, ...rest }) => {
                                const name = fieldName || underscorer(label);
                                return (
                                    <div key={name} flex={flex || "100"} style={{ marginBottom: "1em" }}>
                                        <Input
                                            {...rest}
                                            label={label}
                                            name={name}
                                            value={details[name]}
                                            onChange={handleInputChange}
                                            autoComplete="nocomplete"
                                        />
                                    </div>
                                );
                            })}
                            <div flex="50">
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
                                                    value={details.dob[name]}
                                                    data-namespace="dob"
                                                    type="number"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        );
                                    })}
                                </Flex>
                            </div>
                        </Flex>
                        <Divider />
                        <Addresses
                            details={details.address}
                            onChange={(e, item) =>
                                handleInputChange(e, { ...item, "data-namespace": "address" })
                            }
                        />
                        <Divider />
                        <p><strong>Verification ID (required)</strong></p>
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
                                    name="verification_front"
                                    fileType="fileImage"
                                    id="verification_front"
                                    files={details.verification_front || []}
                                />
                            </div>
                            <div flex="50">
                                <p><strong>Back</strong></p>
                                <FileUpload
                                    handleChange={handleInputChange}
                                    name="verification_back"
                                    fileType="fileImage"
                                    id="verification_back"
                                    files={details.verification_back || []}
                                />
                            </div>
                        </Flex>
                    </Segment>
                    <br />
                    <Divider />
                    {errors.length > 0 && <ErrorHandler errors={errors} />}
                    <Flex spacing="20" spacebetween>
                        <div />
                        <div>
                            {isOpener && (
                                <Button
                                    content={onlyOwner ? "Finish Wholesale Enrollment" : "Add Beneficial Owner(s)"}
                                    icon="right arrow"
                                    labelPosition="right"
                                    primary
                                    onClick={onlyOwner ? handleOnlyOwner : handleAddOwner}
                                    disabled={!submitEnabled}
                                    loading={loading}
                                />
                            )}
                            {!isOpener && (
                                <>
                                    <Button
                                        content="Add Another Owner"
                                        onClick={handleAddAnother}
                                        disabled={!submitEnabled}
                                        loading={loading}
                                    />
                                    <Button
                                        content="Finish Wholesale Enrollment"
                                        icon="right arrow"
                                        labelPosition="right"
                                        primary
                                        onClick={handleFinish}
                                        disabled={!submitEnabled}
                                        loading={loading}
                                    />
                                </>
                            )}
                        </div>
                    </Flex>
                </Form>
            </Segment>
        </React.Fragment>
    );
};

const { object, func, oneOfType, number, string, bool } = PropTypes;
Owner.propTypes = {
    owner: object,
    userId: oneOfType([number, string]),
    updateContext: func,
    isOpener: bool
};

export default withContext(Owner);
