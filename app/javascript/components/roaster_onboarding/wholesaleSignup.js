import React from "react";
import PropTypes from "prop-types";
import { Segment, Button, Header, Step, Divider, Form, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import steps from "roaster_onboarding/wholesaleSteps";
import Flex from "shared/flex";
import Input from "shared/input";
import Addresses from "shared/addresses";
import FileUpload from "shared/fileUpload";
import ErrorHandler from "shared/errorHandler";

import fields from "defs/forms/wholesaleSignup";

import { namespacer, underscorer, jsonToFormData } from "utilities";
import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

const defaults = {
    business: {
        tax_id: process.env.NODE_ENV === "development" ? "000000000" : "",
        phone: process.env.NODE_ENV === "development" ? "7061234567" : "",
        routing: process.env.NODE_ENV === "development" ? "110000000" : "",
        account: process.env.NODE_ENV === "development" ? "000123456789" : "",
        account_confirm: process.env.NODE_ENV === "development" ? "000123456789" : ""
    },
    owner: {
        first_name: "",
        last_name: "",
        title: "",
        email: "",
        phone: process.env.NODE_ENV === "development" ? "7061234567" : "",
        percent_ownership: "",
        ssn_last_4: "",
        dob: {
            dob_day: process.env.NODE_ENV === "development" ? "09" : "",
            dob_month: process.env.NODE_ENV === "development" ? "01" : "",
            dob_year: process.env.NODE_ENV === "development" ? "1990" : ""
        },
        address: {
            street_1: "",
            street_2: "",
            city: "",
            state: "",
            postal_code: ""
        }
    },
    account_opener: {
        first_name: process.env.NODE_ENV === "development" ? "Jane" : "",
        last_name: process.env.NODE_ENV === "development" ? "Doe" : "",
        title: process.env.NODE_ENV === "development" ? "President" : "",
        email: "",
        phone: process.env.NODE_ENV === "development" ? "7061234567" : "",
        ssn_last_4: process.env.NODE_ENV === "development" ? "1234" : "",
        dob: {
            dob_day: process.env.NODE_ENV === "development" ? "09" : "",
            dob_month: process.env.NODE_ENV === "development" ? "01" : "",
            dob_year: process.env.NODE_ENV === "development" ? "1990" : ""
        },
        address: {
            street_1: "",
            street_2: "",
            city: "",
            state: "",
            postal_code: ""
        }
    }
};

class WholesaleSignup extends React.Component {
    static propTypes = () => {
        const { object } = PropTypes;
        return {
            owner: object
        };
    };
    constructor(props) {
        super(props);
        let details = { ...defaults };
        let { owner } = details;
        let { owner: propsOwner } = props;
        let ownerName = propsOwner.name.split(" ");
        owner.first_name = ownerName[0];
        owner.last_name = ownerName[1];
        owner.email = propsOwner.email;
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
        const { userId } = this.props;
        const url = ROASTER_URL(userId) + "/wholesale_signup";
        const response = await requester({ url, body: form_data, noContentType: true });

        setTimeout(async () => {
            if (response instanceof Error) {
                this.setState({ errors: response.response.data, loading: false });
            } else {
                if (response.redirect) {
                    window.location.href = await response.redirect_url;
                } else {
                    this.setState({ loading: false });
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
        const {
            loading,
            details: { owner, account_opener, business, ...details },
            errors
        } = this.state;

        const Input = this.renderInput;
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("bank")} />
                <Segment>
                    <Dimmer active={loading} inverted>
                        <Loader size="large">Processing</Loader>
                    </Dimmer>
                    <Header as="h2">Wholesale Signup</Header>
                    <Divider />
                    <Form>
                        <Segment>
                            <Header as="h4" content="Business Information" />
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
                                            />
                                        </div>
                                    );
                                })}
                            </Flex>
                        </Segment>
                        <br />

                        <Flex spacing="20">
                            <div flex="50">
                                <Segment>
                                    <Header as="h4" content="Owner Information" />
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
                                                    />
                                                </div>
                                            );
                                        })}
                                    </Flex>
                                    <Addresses
                                        details={owner.address}
                                        onChange={(e, item) =>
                                            this.handleInputChange(e, { ...item, "data-namespace": "owner/address" })
                                        }
                                    />
                                    <p><strong>Owner Verification ID (required)</strong></p>
                                    <p>
                                        In order to receive payouts, you will need to verify your identity with a state-issued ID or passport. 
                                        Please upload an image of a valid ID.

                                    </p>
                                    <Flex spacing="10">
                                        <div flex="50">
                                            <p><strong>Front</strong></p>
                                            <FileUpload
                                                handleChange={this.handleInputChange}
                                                name="owner_verification_front"
                                                fileType="fileImage"
                                                id="owner_verification_front"
                                                files={details["owner_verification_front"] || []}
                                            />
                                        </div>
                                        <div flex="50">
                                            <p><strong>Back</strong></p>
                                            <FileUpload
                                                handleChange={this.handleInputChange}
                                                name="owner_verification_back"
                                                fileType="fileImage"
                                                id="owner_verification_back"
                                                files={details["owner_verification_back"] || []}
                                            />
                                        </div>
                                    </Flex>
                                    
                                </Segment>
                            </div>
                            <div flex="50">
                                <Segment>
                                    <Header as="h4" content="Account Opener Information" />
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
                                        In order to receive payouts, you will need to verify your identity with a state-issued ID or passport.
                                        Please upload an image of a valid ID.

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
                            </div>
                        </Flex>
                        <br />
                        <Divider />
                        <ErrorHandler errors={errors} />
                        <Flex spacing="20" spacebetween>
                            <div />
                            <div>
                                <Button
                                    content="Shipping"
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

export default withContext(WholesaleSignup);
