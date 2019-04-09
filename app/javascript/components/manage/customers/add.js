import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import { requester, url as API_URL } from "utilities/apiUtils";
/* eslint-enable */

const defaultDetails = {
    name: "",
    email: "",
    company_name: ""
};

class CreateCustomer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            btnLoading: false,
            errors: [],
            details: defaultDetails
        };
    }
    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ btnLoading: true });
        const { details } = this.state;
        const url = `${API_URL}/customers`;
        const response = await requester({ url, body: details  });
        this.afterSubmit(response);
    };

    afterSubmit = async response => {
        const { closeModal, successClose, updateContext } = this.props;
        setTimeout(async () => {
            if (response instanceof Error) {
                this.setState({ errors: response.response, btnLoading: false });
            } else {
                if (response.redirect) {
                    window.location.href = await response.redirect_url;
                } else {
                    const success = "Customer Added Successfully!";
                    await this.setState({ btnLoading: false });
                    updateContext({ customers: response.data });
                    if( successClose ){
                        successClose(success);
                    } else if( closeModal ){
                        setTimeout(closeModal, 900 );
                    }
                }
            }
        }, 400);
    }

    render() {
        const { details, errors, btnLoading } = this.state;
        return (
            <Form>
                <ErrorHandler errors={errors} />
                <Input
                    name="company_name"
                    label="Company Name"
                    onChange={this.handleInputChange}
                    value={details["company_name"]}
                />
                <Input 
                    name="name"
                    label="Customer Name"
                    onChange={this.handleInputChange}
                    value={details["name"]}
                />
                <Input 
                    name="email"
                    label="Customer Email"
                    onChange={this.handleInputChange}
                    value={details["email"]}
                    type="email"
                    autoComplete="false"
                />
                <Button 
                    onClick={this.handleSubmit}
                    primary
                    content="Add Customer"
                    icon="plus"
                    loading={btnLoading}
                />
            </Form>
        );
    }
}

CreateCustomer.propTypes = {
    closeModal: PropTypes.func,
    successClose: PropTypes.func,
    updateContext: PropTypes.func
};

export default CreateCustomer;
