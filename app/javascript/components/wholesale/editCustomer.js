import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Header, Divider, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import { usStates } from "utilities";
import Input from "shared/input";
import ImageChange from "shared/ImageChange";
import Addresses from "shared/addresses";

import { url as API_URL, requester } from "utilities/apiUtils";

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: props.profile,
            loading: false
        };
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
        details[name] = val;
        this.setState({ details });
    };

    renderInput = props => <Input {...props} onChange={this.handleInputChange} />;

    render() {
        const { details, loading } = this.state;
        const { name, terms, img_url, id, company_name, email, ...address } = details;

        const Input = this.renderInput;
        return (
            <div className="form roaster-wizard">
                <Dimmer active={loading} inverted>
                    <Loader size="large">Saving</Loader>
                </Dimmer>
                <Header as="h2">Customer Profile</Header>
                <div align="center">
                    <ImageChange src={img_url} id={id} />
                </div>
                <Divider />
                <Form onSubmit={this.handleSubmit}>
                    <Input label="Company Name" value={company_name} />
                    <Input label="Contact Name" name="name" value={name} />
                    <Input label="Contact Email" name="email" value={email} type="email" />

                    <Addresses details={address} onChange={this.handleInputChange} />

                    <Input inputType="textarea" label="Terms" defaultValue={terms} />

                    <Form.Button>Submit</Form.Button>
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
