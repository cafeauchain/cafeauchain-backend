import React from "react";
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

import { namespacer, underscorer, jsonToFormData, callMeDanger } from "utilities";
import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class Opener extends React.Component {
    constructor(props) {
        super(props);
        let details = { account_opener: defaults.account_opener };
        const { owner } = props;
        let ownerName = owner.name.split(" ");

        const openerDefaults = {
            first_name: ownerName[0],
            last_name: ownerName[1],
            email: owner.email
        };

        details.account_opener = {
            ...details.account_opener,
            ...openerDefaults
        };

        this.state = {
            details,
            loading: false,
            errors: []
        };
    }

    handleSubmit = async e => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await this.setState({ loading: true, errors: [] });
        const { details } = this.state;
        var form_data = jsonToFormData(details);
        const { userId, updateContext } = this.props;
        const url = ROASTER_URL(userId) + "/wholesale_signup?submit_type=opener";

        const response = await requester({ url, body: form_data, noContentType: true });

        setTimeout(async () => {
            if (response instanceof Error) {
                this.setState({ errors: response.response.data, loading: false });
            } else {
                if (response.redirect) {
                    window.location.href = await response.redirect_url;
                } else {
                    updateContext({ roaster: response.roaster });
                }
            }
        }, 400);
    };

    handleInputChange = (event, { value, name, checked, ...rest }) => {
        // TODO This is super laggy and I'm not sure why
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        if (rest["data-namespace"]) {
            namespacer(rest["data-namespace"], details)[name] = val || "";
        } else {
            details[name] = val || "";
        }
        this.setState({ details });
    };

    renderInput = props => <Input {...props} onChange={this.handleInputChange} />;

    render() {
        // TODO Add workflow for account opener to be a beneficial owner and 
        // skip adding themself again as an owner
        // Also, add short-cut to finish enrollment if they are the ONLY BO
        const {
            loading,
            details: { account_opener, ...details },
            errors
        } = this.state;

        const Input = this.renderInput;
        return (
            <React.Fragment>
                <Segment>
                    <Dimmer active={loading} inverted>
                        <Loader size="large">Processing</Loader>
                    </Dimmer>
                    <Header as="h3">Account Opener</Header>
                    <Divider />
                    <Form>
                        <Segment>
                            <p>
                                {callMeDanger(`Next, we need to collect some information on the person actually 
                                opening the account. This can be an owner, executive, or director.`)}
                            </p>
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
                                    this.handleInputChange(e, {
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
                                        handleChange={this.handleInputChange}
                                        name="opener_verification_front"
                                        fileType="fileImage"
                                        id="opener_verification_front"
                                        files={details["opener_verification_front"] || []}
                                    />
                                </div>
                                <div flex="50">
                                    <p><strong>Back</strong></p>
                                    <FileUpload
                                        handleChange={this.handleInputChange}
                                        name="opener_verification_back"
                                        fileType="fileImage"
                                        id="opener_verification_back"
                                        files={details["opener_verification_back"] || []}
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
                                    content="Add Beneficial Owner(s)"
                                    icon="right arrow"
                                    labelPosition="right"
                                    primary
                                    onClick={this.handleSubmit}
                                />
                            </div>
                        </Flex>
                    </Form>
                </Segment>
            </React.Fragment>
        );
    }
}

const { object, array, func, oneOfType, number, string } = PropTypes;
Opener.propTypes = {
    owner: object,
    roaster: object,
    addresses: array,
    userId: oneOfType([number, string]),
    updateContext: func
};

export default withContext(Opener);
