import React from "react";
import PropTypes from "prop-types";
import { Segment, Label, Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Flex from "shared/flex";
import Modal from "shared/modal";
import ErrorHandler from "shared/errorHandler";

import EditCustomer from "wholesale/editCustomer";
import ApproveCustomer from "wholesale/actions/approveCustomer";

import tableDefs from "defs/tables/customerOrdersTable";

import { sortBy, humanize } from "utilities";
import { url as API_URL, requester } from "utilities/apiUtils";
import withContext from "contexts/withContext";
/* eslint-enable */

class Customer extends React.PureComponent {
    static propTypes = () => {
        const { object, func } = PropTypes;
        return {
            customer: object,
            updateContext: func
        };
    };

    state = {
        messages: [],
        errors: [],
        btnLoading: false
    }

    onClick = (e, item) => {
        e.preventDefault();
        window.location = "/manage/orders/" + item.id;
    };

    passwordReset = async e => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await this.setState({ btnLoading: true });
        const { customer: { id: customer_profile_id }, userId: roaster_profile_id } = this.props;
        const url = API_URL + "/password_reset";
        const body = { customer_profile_id, roaster_profile_id };
        const response = await requester({ url, body  });
        this.afterSubmit(response);
    }

    afterSubmit = async response => {
        setTimeout( async () => {
            if( response instanceof Error ){
                this.setState({
                    btnLoading: false,
                    errors: ["There was an error resetting your password. Please try again later."]
                });
            } else {
                this.setState({ btnLoading: false, messages: ["Password Reset Sent"] });
                
            }
        }, 400);
    }

    render() {
        const { customer, updateContext } = this.props;
        const { btnLoading, messages, errors } = this.state;
        const { attributes, id } = customer;
        const orders = attributes ? attributes.orders : [];
        const sorted = sortBy({ collection: orders, id: "id", sorts: [{ name: "status" }] });
        const profile = {
            id: id,
            company_name: attributes.company_name || "",
            name: attributes ? attributes.owner.name : "",
            email: attributes.email || "",
            street_1: attributes.primary_address ? attributes.primary_address.street_1 || "" : "",
            street_2: attributes.primary_address ? attributes.primary_address.street_2 || "" : "",
            city: attributes.primary_address ? attributes.primary_address.city || "" : "",
            state: attributes.primary_address ? attributes.primary_address.state || "" : "",
            postal_code: attributes.primary_address ? attributes.primary_address.postal_code || "" : "",
            terms: attributes.terms || "",
            status: attributes.wholesale_profile.onboard_status,
            logo_url: attributes.logo_url,
            tax_rate: attributes.wholesale_profile.tax_rate || "",
            cust_discount: attributes.wholesale_profile.cust_discount || "",
        };
        let status = humanize(profile.status);
        if( profile.status === "onboard_completed" ) status = "Pending Approval";
        return (
            <Segment>
                <Flex spacing="20" centercross>
                    <div flex="75">
                        <Header as="h2" content="Customer Profile" />
                    </div>
                    <div flex="25">
                        <Label ribbon="right" color={status === 'Approved' ? 'green' : 'grey'} content={status} />
                        {status === 'Pending Approval' && (
                            <div>
                                <br />
                                <Modal 
                                    text="Approve Customer"
                                    title="Approve Customer"
                                    component={<ApproveCustomer profile={profile} updateContext={updateContext} />}
                                    className="right floated"
                                />
                            </div>
                        )}
                    </div>
                </Flex>
                <EditCustomer profile={profile} />
                <br />

                <ErrorHandler 
                    errors={messages.length ? messages : errors}
                    positive={!!messages.length}
                    negative={!messages.length}
                />
                <Button onClick={this.passwordReset} content="Send Password Reset Link" compact loading={btnLoading} />
                <br />
                <br />
                <Table tableDefs={tableDefs} data={sorted} onClick={this.onClick} />
            </Segment>
        );
    }
}

export default withContext(Customer);
