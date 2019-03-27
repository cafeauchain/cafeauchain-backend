import React from "react";
import PropTypes from "prop-types";
import { Segment, Label, Header } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Flex from "shared/flex";
import Modal from "shared/modal";

import EditCustomer from "wholesale/editCustomer";
import ApproveCustomer from "wholesale/actions/approveCustomer";

import tableDefs from "defs/tables/customerOrdersTable";

import { sortBy, humanize } from "utilities";
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

    onClick = (e, item) => {
        e.preventDefault();
        window.location = "/manage/orders/" + item.id;
    };

    render() {
        const { customer, updateContext } = this.props;
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
            terms: attributes.terms || "",
            status: attributes.wholesale_profile.onboard_status,
            logo_url: attributes.logo_url,
            tax_rate: attributes.wholesale_profile.tax_rate || ""
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
                <Table tableDefs={tableDefs} data={sorted} onClick={this.onClick} />
            </Segment>
        );
    }
}

export default withContext(Customer);
