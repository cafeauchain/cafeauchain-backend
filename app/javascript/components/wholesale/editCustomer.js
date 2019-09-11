import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Header, Divider, Dimmer, Loader, Image, Segment } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Addresses from "shared/addresses";
import Flex from "shared/flex";
import ErrorHandler from "shared/errorHandler";

import { url as API_URL, requester } from "utilities/apiUtils";
/* eslint-enable */

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: props.profile,
            loading: false
        };
    }

    componentDidUpdate(props){
        const { profile } = props;
        const { profile: newProfile } = this.props;
        // eslint-disable-next-line react/no-did-update-set-state
        if( profile !== newProfile ) this.setState({ details: newProfile }); 
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ loading: true });
        const { details } = this.state;
        const { id, ...profile } = details;
        const url = `${API_URL}/customers/${id}`;
        const response = await requester({ url, body: profile, method: "PUT" });
        setTimeout(async () => {
            if (response instanceof Error) {
                this.setState({ errors: response.response.data, loading: false });
            } else {
                if (response.redirect) {
                    window.location.href = await response.redirect_url;
                } else {
                    // await updateDate("orders");
                    this.setState({ loading: false });
                }
            }
        }, 400);
    };

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details });
    };

    renderInput = props => <Input {...props} onChange={this.handleInputChange} />;

    render() {
        const { details, loading, errors } = this.state;
        const { name, terms, tax_rate, logo_url, id, company_name, email, cust_discount, ...address } = details;

        const Input = this.renderInput;
        return (
            <div className="form roaster-wizard">
                <Dimmer active={loading} inverted>
                    <Loader size="large">Saving</Loader>
                </Dimmer>
                <Divider />
                <Form onSubmit={this.handleSubmit}>
                    <ErrorHandler errors={errors} />
                    <Flex spacing="20">
                        <div flex="66">
                            <Input label="Company Name" value={company_name} />
                            <Input label="Contact Name" name="name" value={name} />
                            <Input label="Contact Email" name="email" value={email} type="email" />
                        </div>
                        <div flex="33">
                            <Image src={logo_url} size="medium" bordered padded="very" rounded />
                        </div>
                    </Flex>

                    <Addresses details={address} onChange={this.handleInputChange} />
                    <Segment tertiary>
                        <Header as="h4" content="Wholesale Profile Details" />
                        <Input inputType="textarea" label="Terms" value={terms} />
                        <Input label="Tax Rate" value={tax_rate} />
                        <Input label="Customer Discount" name="cust_discount" value={cust_discount} />
                    </Segment>
                    <Form.Button content="Update Customer Profile" primary />
                </Form>
            </div>
        );
    }
}

const { object } = PropTypes;
EditCustomer.propTypes = {
    profile: object.isRequired
};

export default EditCustomer;
