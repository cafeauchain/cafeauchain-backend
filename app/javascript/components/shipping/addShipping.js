import React from "react";
import PropTypes from "prop-types";
import { Container, Segment, Form, Button } from "semantic-ui-react";

/* eslint-disable */
import "shipping/styles.scss";
import Flex from "shared/flex";
import Input from "shared/input";
import { humanize } from "utilities";
import { requester, roasterUrl } from "utilities/apiUtils";
import ErrorHandler from "shared/errorHandler";

import withContext from "contexts/withContext";
/* eslint-enable */

const acctFields = {
    ups: [
        { name: "username", label: "UPS Username" },
        { name: "password", label: "UPS Password", type: "password" },
        { name: "account_id", label: "UPS Account Id" },
        { name: "access_license_number", label: "UPS Access License Number" }
    ],
    usps: [],
    fedex: [
        { name: "username", label: "FedEx Username" },
        { name: "password", label: "FedEx Password", type: "password" },
        { name: "account_id", label: "FedEx Account Id" },
        { name: "meter_number", label: "FedEx Meter Number (Optional)" }
    ],
    local_delivery: [
        { name: "friendly_name", label: "Name", defaultValue: "Local Delivery" },
        { name: "rate", label: "Local Delivery Fee" }
    ],
    pick_up: [
        { name: "friendly_name", label: "Name", defaultValue: "Customer Pickup" },
        { name: "rate", label: "Customer Pickup Fee" }
    ]
};

const carrierCheckboxes = carriers => Object.keys(carriers).map(carrier => {
    return {
        name: carrier,
        label: carrier.indexOf("_") > -1 ? humanize(carrier) : carrier.toUpperCase(),
        inputType: 'checkbox'
    };
});

class AddShipping extends React.PureComponent {
    constructor( props ) {
        super(props);
        const { shipping_methods } = props;
        const array = new Set(shipping_methods.map( method => method.carrier ));
        this.state = {
            carriers: {
                ups: array.has('ups') ? 2 :  0,
                usps: array.has('usps') ? 2: 0,
                fedex: array.has('fedex') ? 2 : 0,
                local_delivery: array.has('local_delivery') ? 2 : 0,
                pick_up: array.has('pick_up') ? 2 : 0
            },
            acctDetails: this.buildDefaultDetails(),
            btnLoading: "",
            errors: {
                ups: [],
                fedex: [],
                usps: []
            }
        };
    }

    buildDefaultDetails = () => {
        const { shipping_methods } = this.props;
        const keys = Object.keys(acctFields);
        return keys.reduce((obj, acct) => {
            const method = shipping_methods.find( data => data.carrier === acct);
            obj[acct] = {};
            obj[acct].carrier = acct;
            const fields = acctFields[acct].reduce( (inner, { name, defaultValue }) => {
                let value = { [name]: method ? method[name] : (defaultValue || "") };
                return { ...inner, ...value };
            }, {});
            obj[acct] = {...obj[acct], ...fields };
            return obj;
        }, {} );
    }

    handleCheckboxChange = (event, { name, checked }) => {
        let { carriers } = this.state;
        carriers = { ...carriers };
        if (name === "") return;
        const val = !checked ? 0 : 1;
        carriers[name] = val;
        this.setState({ carriers });
    };

    handleAcctChange = (e, { value, name, checked, ...rest }) => {
        let { acctDetails } = this.state;
        acctDetails = { ...acctDetails };
        if (name === "") return;
        const val = value || checked;
        acctDetails[rest["data-acct"]][name] = val;
        this.setState({ acctDetails });
    }

    handleCarrierSubmit = async (e, extra ) => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        const carrier = extra["data-acct"];
        const { userId } = this.props;
        const { acctDetails: { [carrier]: data } } = this.state;
        let { errors } = this.state;
        errors = { ...errors };
        errors[carrier] = [];
        await this.setState({ btnLoading: carrier, errors });
        const url = roasterUrl(userId) + "/shipping_methods";
        const response = await requester({ url, body: data });
        this.handleAfterSubmit( response, carrier );
    }

    handleAfterSubmit = async (response, carrier) => {
        const { updateContext, shipping_methods } = this.props;
        let { errors } = this.state;
        let { carriers } = this.state;
        setTimeout( async () => {
            await this.setState({ btnLoading: "" });
            if (response instanceof Error) {
                errors = {...errors};
                errors[carrier] = [response.response.message];
                this.setState({ errors });
            } else {
                await updateContext({ shipping_methods: [...shipping_methods, response] });
                carriers = { ...carriers };
                carriers[carrier] = 2;
                this.setState({ carriers });
            }
        }, 400);
        
    }

    render() {
        const { carriers, btnLoading, acctDetails, errors } = this.state;
        return (
            <Container text>
                <p>
                    Set up your shipping methods below. 
                    First, choose the option you plan to use and fill out the details. 
                    Once you have added all of your carriers, click Products at the bottom 
                    to continue the onboarding process.
                </p>
                <Form>
                    {carrierCheckboxes(carriers).map(checkbox => (
                        <Segment 
                            basic
                            key={checkbox.name}
                            className={carriers[checkbox.name] === 2 ? "disabler" : ""}
                        >
                            <Input 
                                {...checkbox}
                                onChange={this.handleCheckboxChange}
                                defaultChecked={carriers[checkbox.name] !== 0}
                            />
                            {carriers[checkbox.name] !== 0 && (
                                <Segment>
                                    <ErrorHandler errors={errors[checkbox.name]} />
                                    <Flex spacing="10" wrap>
                                        {acctFields[checkbox.name].map(acct => (
                                            <div flex="50" key={acct.name}>
                                                <Input 
                                                    {...acct}
                                                    onChange={this.handleAcctChange}
                                                    data-acct={checkbox.name}
                                                    autoComplete="off"
                                                    defaultValue={undefined}
                                                    value={acctDetails[checkbox.name][acct.name] || ""}
                                                />
                                            </div>
                                        ))}
                                    </Flex>
                                    <br />
                                    <Button
                                        primary
                                        content={"Add " + checkbox.label}
                                        onClick={this.handleCarrierSubmit}
                                        data-acct={checkbox.name}
                                        loading={btnLoading === checkbox.name}
                                    />
                                </Segment>
                            )}
                        </Segment>
                    ))}
                </Form>
            </Container>
        );
    }
}
const { oneOfType, number, string, func, array } = PropTypes;
AddShipping.propTypes = {
    userId: oneOfType([number, string]),
    updateContext: func,
    shipping_methods: array
};

export default withContext(AddShipping);
