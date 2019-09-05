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

import { underscorer, jsonToFormData, callMeDanger } from "utilities";
import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";
import { useHandleInput, useAfterSubmit } from "utilities/hooks";

import withContext from "contexts/withContext";
/* eslint-enable */

const Opener = (props) => {
    let initdetails = { account_opener: defaults.account_opener };
    const { owner } = props;
    let ownerName = owner.name.split(" ");

    const openerDefaults = {
        first_name: ownerName[0],
        last_name: ownerName[1],
        email: owner.email
    };

    initdetails.account_opener = {
        ...initdetails.account_opener,
        ...openerDefaults,
        isOwner: "no",
        isOnlyOwner: "no"
    };

    const [ loading, updateLoading ] = useState(false);
    const [ errors, updateErrors ] = useState([]);
    const { details, handleInputChange } = useHandleInput(initdetails);

    const errback = response => {
        updateErrors(response.response.data);
        updateLoading(true);
    };
    const callback = response => {
        const { updateContext } = props;
        updateContext({ roaster: response.roaster });
        updateLoading(false);
    };

    const handleAddOwner = async e => handleSubmit(e, "opener");
    const handleFinish = async e => handleSubmit(e, "only_owner");

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

    const { account_opener } = details;
    const openerIsOwner_options = [
        { label: "Yes", value: "yes", checked: account_opener.isOwner === "yes" },
        { label: "No", value: "no", checked: account_opener.isOwner === "no" }
    ];
    const openerIsOnlyOwner_options = [
        { label: "Yes", value: "yes", checked: account_opener.isOnlyOwner === "yes" },
        { label: "No", value: "no", checked: account_opener.isOnlyOwner === "no" }
    ];

    return (
        <Segment>
            <Dimmer active={loading} inverted>
                <Loader size="large">Processing</Loader>
            </Dimmer>
            <Header as="h3">Account Opener</Header>
            <Divider />
            <p>
                {callMeDanger(`Next, we need to collect some information on the person actually 
                    opening the account. This can be an owner, executive, or director.`)}
            </p>
            <Form>
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
                        data-namespace="account_opener"
                        dataArray={openerIsOwner_options}
                        onChange={handleInputChange}
                    />
                    {account_opener.isOwner === "yes" && (
                        <>
                            <p>
                                {callMeDanger(`Is this beneficial owner the <strong>ONLY</strong> 
                                    beneficial owner (having an ownership stake of 25 % or more)?`)}
                            </p>
                            <Input
                                inputType="radio"
                                label=""
                                name="isOnlyOwner"
                                data-namespace="account_opener"
                                dataArray={openerIsOnlyOwner_options}
                                onChange={handleInputChange}
                            />
                        </>
                    )}
                </Segment>
                <Flex spacing="10" wrap>
                    {fields.opener.map(({ name: fieldName, label, flex, ...rest }) => {
                        const name = fieldName || underscorer(label);
                        return (
                            <div key={name} flex={flex || "100"} style={{ marginBottom: "1em" }}>
                                <Input
                                    {...rest}
                                    label={label}
                                    name={name}
                                    value={account_opener[name]}
                                    data-namespace="account_opener"
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
                                    value={account_opener["dob"][name]}
                                    data-namespace="account_opener/dob"
                                    type="number"
                                />
                            </div>
                        );
                    })}
                </Flex>
                <Addresses
                    details={account_opener.address}
                    onChange={(e, item) =>
                        handleInputChange(e, {
                            ...item,
                            "data-namespace": "account_opener/address"
                        })
                    }
                />
                <p><strong>Opener Verification ID (required)</strong></p>
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
                            name="opener_verification_front"
                            fileType="fileImage"
                            id="opener_verification_front"
                            files={details["opener_verification_front"] || []}
                        />
                    </div>
                    <div flex="50">
                        <p><strong>Back</strong></p>
                        <FileUpload
                            handleChange={handleInputChange}
                            name="opener_verification_back"
                            fileType="fileImage"
                            id="opener_verification_back"
                            files={details["opener_verification_back"] || []}
                        />
                    </div>
                </Flex>
                <br />
                <Divider />
                <ErrorHandler errors={errors} />
                <Flex spacing="20" spacebetween>
                    <div />
                    <div>
                        {account_opener.isOnlyOwner === "yes" && account_opener.isOwner === "yes" && (
                            <Button
                                content="Finish Wholesale Enrollment"
                                icon="right arrow"
                                labelPosition="right"
                                primary
                                onClick={handleFinish}
                            />
                        )}
                        {(account_opener.isOnlyOwner === "no" || account_opener.isOwner === "no") && (
                            <Button
                                content="Add Beneficial Owner(s)"
                                icon="right arrow"
                                labelPosition="right"
                                primary
                                onClick={handleAddOwner}
                            />
                        )}
                    </div>
                </Flex>
            </Form>
        </Segment>
    );
};

const { object, func, oneOfType, number, string } = PropTypes;
Opener.propTypes = {
    owner: object,
    userId: oneOfType([number, string]),
    updateContext: func
};

export default withContext(Opener);
