import React from "react";
import PropTypes from "prop-types";
import { Segment, Button, Label } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import EditCustomer from "wholesale/editCustomer";

import tableDefs from "defs/tables/customerOrdersTable";

import { sortBy, humanize } from "utilities";
import { requester, url as API_URL } from 'utilities/apiUtils'
import withContext from "contexts/withContext";
/* eslint-enable */

class Customer extends React.Component {
    static propTypes = () => {
        const { object } = PropTypes;
        return {
            customer: object
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            btnLoading: false
        };
    }

    onClick = (e, item) => {
        e.preventDefault();
        window.location = "/manage/orders/" + item.id;
    };

    approveCustomer = async e => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await this.setState({ btnLoading: true });
        const { customer: { id } } = this.props;
        const url = API_URL + "/customers/" + id + "/update_onboard_status";
        const response = await requester({ url, body: { status: 'approved' }, method: 'PUT' });
        this.afterApproval(response);
    }
    afterApproval = async response => {
        const { updateContext } = this.props;
        setTimeout(() => {
            this.setState({ btnLoading: false });
            if (response instanceof Error) {
                console.log('there was a error', response, response.response);
            } else {
                console.log('customer approved', response);
                updateContext({customer: response.customer.data});
            }
        }, 400);
        
    }

    render() {
        const { btnLoading } = this.state;
        const { customer } = this.props;
        const { attributes, id } = customer;
        const orders = attributes ? attributes.orders : [];
        const sorted = sortBy({ collection: orders, id: "id", sorts: [{ name: "status" }] });
        const profile = {
            id: id,
            company_name: attributes.company_name || "",
            name: attributes ? attributes.owner.name : "",
            email: attributes.email || "",
            street_1: attributes.primary_address.street_1 || "",
            street_2: attributes.primary_address.street_2 || "",
            city: attributes.primary_address.city || "",
            state: attributes.primary_address.state || "",
            postal_code: attributes.primary_address.postal_code || "",
            terms: attributes.terms,
            status: attributes.wholesale_profile.onboard_status
        };
        let status = humanize(profile.status);
        if( profile.status === "onboard_completed" ) status = "Pending Approval";
        return (
            <div>
                <Segment>
                    <Label ribbon="right" color={status === 'Approved' ? 'green' : 'grey'} content={status} />
                    {status === 'Pending Approval' && (
                        <div style={{ clear: "both" }}>
                            <br />
                            <br />
                            <Button 
                                primary
                                content="Approve Customer"
                                onClick={this.approveCustomer}
                                floated="right"
                                loading={btnLoading}
                            />
                        </div>
                    )}
                    <div style={{ clear: 'both'}} />
                    <EditCustomer profile={profile} />
                    <Table tableDefs={tableDefs} data={sorted} onClick={this.onClick} />
                </Segment>
            </div>
        );
    }
}

export default withContext(Customer);
