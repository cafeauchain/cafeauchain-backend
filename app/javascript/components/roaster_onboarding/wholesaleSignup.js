import React from "react";
import PropTypes from "prop-types";
import { Segment, Button, Header, Step, Divider, Form, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import steps from "roaster_onboarding/steps";
import Flex from "shared/flex";
import Input from "shared/input";
import Addresses from "shared/addresses";

import fields from "defs/forms/wholesaleSignup";

import { namespacer, underscorer } from "utilities";
import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

const defaults = {
    tax_id: "",
    phone: "",
    owner: {
        first_name: "",
        last_name: "",
        email: "",
        dob: {
            day: "",
            month: "",
            year: ""
        },
        address: {
            street_1: "",
            street_2: "",
            city: "",
            state: "",
            postal_code: ""
        },
        title: "",
        percent_ownership: "",
        ssn_last_4: ""
    },
    account_opener: {
        first_name: "",
        last_name: "",
        email: "",
        dob: {
            day: "",
            month: "",
            year: ""
        },
        address: {
            street_1: "",
            street_2: "",
            city: "",
            state: "",
            postal_code: ""
        },
        title: ""
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
            loading: false
        };
    }

    handleSubmit = async e => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await this.setState({ loading: true });
        const { details } = this.state;
        // console.log(this.state);
    };

    handleInputChange = (event, { value, name, checked, ...rest }) => {
        // TODO This is super laggy and I'm not sure why
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        if (rest["data-namespace"]) {
            namespacer(rest["data-namespace"], details)[name] = val;
        } else {
            details[name] = val;
        }
        // console.log(details);
        this.setState({ details });
    };

    renderInput = props => <Input {...props} onChange={this.handleInputChange} />;

    render() {
        const {
            loading,
            details: { tax_id, phone, owner, account_opener }
        } = this.state;

        const Input = this.renderInput;
        return (
            <React.Fragment>
                <Step.Group fluid items={steps("wholesale")} />
                <Segment>
                    <Dimmer active={loading} inverted>
                        <Loader size="large">Saving</Loader>
                    </Dimmer>
                    <Header as="h2">Wholesale Signup</Header>
                    <Divider />
                    <Form onSubmit={this.startSubmit}>
                        <Flex spacing="20">
                            <div flex="50" style={{ marginBottom: "1em" }}>
                                <Input label="Tax ID" name="tax_id" value={tax_id} />
                            </div>
                            <div flex="50" style={{ marginBottom: "1em" }}>
                                <Input label="Phone" value={phone} type="phone" />
                            </div>
                        </Flex>
                        <br />
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
                                        details={owner.address}
                                        onChange={(e, item) =>
                                            this.handleInputChange(e, {
                                                ...item,
                                                "data-namespace": "account_opener/address"
                                            })
                                        }
                                    />
                                </Segment>
                            </div>
                        </Flex>
                        <br />
                        <Divider />

                        <Flex spacing="20" spacebetween>
                            <div />
                            <div>
                                <Button content="Create Products" icon="right arrow" labelPosition="right" primary />
                            </div>
                        </Flex>
                    </Form>
                </Segment>
            </React.Fragment>
        );
    }
}

export default withContext(WholesaleSignup);
