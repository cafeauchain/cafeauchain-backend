import React, { PureComponent } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Input from "shared/input";

import withContext from "contexts/withContext";
/* eslint-enable */

class createOrderBehalf extends PureComponent {
    buildCustomerOptions = customers => customers.map(({company_name, id}) => {
        return {
            value: id,
            text: company_name,
            key: id,
            id
        };
    });
    handleInputChange = (event, { value }) => {
        window.location = `/manage/orders/new?customer_profile_id=${value}`;

    };
    render(){
        const { customers } = this.props;
        return (
            <Input 
                onChange={this.handleInputChange}
                name="customer"
                label="Select Customer"
                options={this.buildCustomerOptions(customers)}
                inputType="select"
            />
            
        );
    }
}

const { array } = PropTypes;
createOrderBehalf.propTypes = {
    customers: array
};

export default withContext(createOrderBehalf);