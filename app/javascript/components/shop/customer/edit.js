import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Header, Divider, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import FileUpload from "shared/fileUpload";
import ImageChange from "shared/ImageChange";
import Addresses from "shared/addresses";
import Flex from "shared/flex";

import { url as API_URL, requester } from "utilities/apiUtils";

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        const {
            profile: {
                data: { attributes, id }
            }
        } = props;

        this.state = {
            details: this.profileDefaults(attributes, id),
            loading: false
        };
    }

    profileDefaults = (attributes, id) => {
        const primaryAddress = attributes.addresses.find(address => address.primary_location);
        return {
            id: id,
            company_name: attributes.company_name || "",
            name: attributes.name || attributes.owner.name,
            email: attributes.email || attributes.owner.email,
            street_1: primaryAddress ? primaryAddress.street_1 : "",
            street_2: primaryAddress ? primaryAddress.street_2 : "",
            city: primaryAddress ? primaryAddress.city : "",
            state: primaryAddress ? primaryAddress.state : "",
            postal_code: primaryAddress ? primaryAddress.postal_code : ""
            // terms: attributes.terms
        };
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ loading: true });
        const { details } = this.state;
        const { id, ...profile } = details;
        const url = `${API_URL}/customers/${id}`;
        const response = await requester({ url, body: profile, method: "PUT" });
        const hasAttachments = details.hasOwnProperty("logo") && details.logo.length > 0;
        if (hasAttachments) {
            let formData = new FormData();
            details.logo.forEach(file => formData.append("logo[]", file));
            // const { id: productId } = respJSON.data;
            await requester({ url: url + "/add_logo", body: formData, noContentType: true });
        }
        setTimeout(async () => {
            if (response instanceof Error) {
                this.setState({ errors: response.response.data, loading: false });
            } else {
                if (response.redirect) {
                    window.location.href = await response.redirect_url;
                } else {
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
        console.log(details);
        this.setState({ details });
    };

    renderInput = props => <Input {...props} onChange={this.handleInputChange} />;

    render() {
        const { details, loading } = this.state;
        const { name, terms, logo = [], id, company_name, email, ...address } = details;

        const Input = this.renderInput;
        return (
            <div className="form roaster-wizard">
                <Dimmer active={loading} inverted>
                    <Loader size="large">Saving</Loader>
                </Dimmer>
                <Header as="h2">Customer Profile</Header>

                <Form onSubmit={this.handleSubmit}>
                    <Flex spacing="20">
                        <div flex="66">
                            <Input label="Company Name" value={company_name} />
                            <Input label="Contact Name" name="name" value={name} />
                            <Input label="Contact Email" name="email" value={email} type="email" />
                        </div>
                        <div flex="33">
                            <Header as="h4" content="Company Logo" />
                            <FileUpload
                                name="logo"
                                handleChange={this.handleInputChange}
                                headerText="No Logo Added"
                                fileType="fileImage"
                                files={logo}
                                textAlign="center"
                            />
                        </div>
                    </Flex>
                    <Header as="h4" content="Primary Address" />

                    <Addresses details={address} onChange={this.handleInputChange} />
                    <a href="/shop/manage-addresses" style={{ fontSize: 12 }}>
                        Manage Addresses
                    </a>
                    <br />
                    <br />

                    {false && <Input inputType="textarea" label="Terms" defaultValue={terms} />}

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
