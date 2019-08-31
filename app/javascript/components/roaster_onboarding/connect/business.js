import React from "react";
import PropTypes from "prop-types";
import { Segment, Button, Header, Divider, Form, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import Addresses from "shared/addresses";
import Flex from "shared/flex";
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import fields from "defs/forms/wholesaleSignup";

import defaults from "roaster_onboarding/connect/defaults";

import { namespacer, underscorer, jsonToFormData, callMeDanger } from "utilities";
import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class Business extends React.Component {
    constructor(props) {
        super(props);
        let details = { business: defaults.business };
        const { roaster, owner, addresses } = props;
        const roasterDefaults = {
            name: roaster.name,
            url: roaster.url,
            support_url: roaster.url,
            email: owner.email,
            address: addresses[0]
        };
        details.business = {...details.business, ...roasterDefaults };
        
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
        const url = ROASTER_URL(userId) + "/wholesale_signup";

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
        const {
            loading,
            details: { business },
            errors
        } = this.state;

        const Input = this.renderInput;
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
                                            />
                                        </div>
                                    );
                                })}
                            </Flex>
                            <Addresses
                                details={business.address}
                                onChange={(e, item) =>
                                    this.handleInputChange(e, { ...item, "data-namespace": "business/address" })
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
Business.propTypes = {
    owner: object,
    roaster: object,
    addresses: array,
    userId: oneOfType([ number, string ]),
    updateContext: func
};

export default withContext(Business);
