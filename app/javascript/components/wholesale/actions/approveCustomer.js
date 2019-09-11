import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import { requester, url as API_URL } from 'utilities/apiUtils'
/* eslint-enable */

class ApproveCustomer extends React.Component {
    static propTypes = () => {
        const { object, func } = PropTypes;
        return {
            profile: object,
            updateContext: func,
            successClose: func,
            closeModal: func
        };
    };
    constructor(props) {
        super(props);
        const { profile: { tax_rate, terms, cust_discount } } = props;
        this.state = {
            btnLoading: false,
            errors: [],
            details: {
                tax_rate: Number(tax_rate) || 0,
                terms,
                cust_discount
            }
        };
    }

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val;
        this.setState({ details });
    };

    approveCustomer = async e => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await this.setState({ btnLoading: true });
        const { profile: { id } } = this.props;
        const url = API_URL + "/customers/" + id;
        const { details } = this.state;
        const body = { onboard_status: 'approved', ...details };
        const response = await requester({ url, body, method: 'PUT' });
        this.afterApproval(response);
    }
    afterApproval = async response => {
        const { updateContext, successClose, closeModal } = this.props;
        const success = "Customer Approved!";
        await setTimeout(async () => {
            this.setState({ btnLoading: false });
            if (response instanceof Error) {
                this.setState({ errors: [response.response.data] });
            } else {
                if( response.redirect ){
                    window.location = await response.redirect_url;
                } else {
                    const update = { customer: response.customer.data };
                    if( successClose ){
                        successClose(success, updateContext, update);
                    } else if (closeModal){
                        closeModal();
                        updateContext(update);
                    }
                }
            }
        }, 400);
    }

    render() {
        const { btnLoading, details, errors } = this.state;
        return (
            <Form>
                <ErrorHandler errors={errors} />
                <Input 
                    name="tax_rate"
                    label="Tax Rate"
                    onChange={this.handleInputChange}
                    value={details.tax_rate || ""}
                    autoComplete="off"
                />
                <Input 
                    name="terms"
                    label="Terms"
                    inputType="textarea"
                    onChange={this.handleInputChange}
                    value={details.terms || ""}
                />
                <Input
                    name="cust_discount"
                    label="Customer Discount"
                    type="number"
                    onChange={this.handleInputChange}
                    value={details.cust_discount || ""}
                />
                <Button 
                    primary
                    content="Approve Customer"
                    onClick={this.approveCustomer}
                    loading={btnLoading}
                />
            </Form>
        );
    }
}

export default ApproveCustomer;
