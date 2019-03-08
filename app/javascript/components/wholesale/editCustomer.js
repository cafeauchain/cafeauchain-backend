import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Container, Header, Divider, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import { usStates } from "utilities";
import Input from "shared/input";
import ImageChange from "shared/ImageChange";

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
        const { name, address_1, address_2, city, state, zip_code, terms, img_url, id, company_name, email } = details;

        const Input = this.renderInput;
        return (
            <Container className="form roaster-wizard">
                <Dimmer active={loading} inverted>
                    <Loader size="large">Saving</Loader>
                </Dimmer>
                <Header as="h2">Customer Profile</Header>
                <Container align="center">
                    <ImageChange src={img_url} id={id} />
                </Container>
                <Divider />
                <Form onSubmit={this.handleSubmit}>
                    <Input label="Company Name" value={company_name} />
                    <Input label="Name" value={name} />
                    <Input label="Email" value={email} type="email" />

                    <Form.Group inline widths="equal">
                        <Input label="Address 1" value={address_1} />
                        <Input label="Address 2" value={address_2} />
                    </Form.Group>

                    <Form.Group inline widths="equal">
                        <Input label="City" value={city} />
                        <Input label="Zip" value={zip_code} name="zip_code" />
                        <Input inputType="select" label="State" defaultValue={state} options={usStates} />
                    </Form.Group>

                    <Input inputType="textarea" label="Terms" defaultValue={terms} />

                    <Form.Button>Submit</Form.Button>
                </Form>
            </Container>
        );
    }
}

const { object } = PropTypes;
EditCustomer.propTypes = {
    profile: object.isRequired
};

export default EditCustomer;
