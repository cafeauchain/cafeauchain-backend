import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Header, Divider, Dimmer, Loader, Segment } from "semantic-ui-react";

/* eslint-disable*/
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import Addresses from "shared/addresses";
import FileUpload from "shared/fileUpload";
import Flex from "shared/flex";

import { requester, roasterUrl } from "utilities/apiUtils"

import withContext from "contexts/withContext";
/* eslint-enable */

class EditRoasterProfile extends Component {
    constructor(props) {
        super(props);
        const { attributes, id } = props.profile;
        this.state = {
            details: this.profileDefaults( attributes, id ),
            loading: false,
            errors: [],
            logo_url: attributes.logo_image_url
        };
    }

    profileDefaults = (attributes, id) => {
        const primaryAddress = attributes.primary_address;
        return {
            id: id,
            name: attributes.name || "",
            about: attributes.about || "",
            facebook: attributes.facebook || "",
            twitter: attributes.twitter || "",
            url: attributes.url || "",
            street_1: primaryAddress ? primaryAddress.street_1 : "",
            street_2: primaryAddress ? primaryAddress.street_2 : "",
            city: primaryAddress ? primaryAddress.city : "",
            state: primaryAddress ? primaryAddress.state : "",
            postal_code: primaryAddress ? primaryAddress.postal_code : ""
        };
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ loading: true });
        const { details } = this.state;
        const url = roasterUrl(details.id);
        const body = {
            roaster_profile: details
        };
        const response = await requester({ url, body, method: "PUT" });
        if( details.hasOwnProperty("logo") && details.logo.length > 0 ){
            this.handleImage(details.logo[0], url);
        }
        
        this.afterSubmit(response);
    };

    handleImage = async (logo, url) => {
        let formData = new FormData();
        formData.append("logo", logo);
        await requester({ url: url + "/update_logo", body: formData, method: "PUT", noContentType: true });
    }

    afterSubmit = response => {
        setTimeout(() => {
            if (response instanceof Error) {
                this.setState({ errors: [response.response.data], loading: false });
            } else {
                this.setState({ loading: false });
            }
        }, 600 );
    }

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
        const { details, loading, errors, logo_url } = this.state;
        const { name, about, facebook, twitter, url, logo = [], ...address } = details;

        const Input = this.renderInput;
        return (
            <Segment className="form roaster-wizard">
                <ErrorHandler errors={errors} />
                <Dimmer active={loading} inverted>
                    <Loader size="large">Saving</Loader>
                </Dimmer>
                <Header as="h2">Roaster Profile</Header>
                <Divider />
                <Form onSubmit={this.handleSubmit}>
                    <Flex spacing="20">
                        <div flex="66">
                            <Input label="Name" value={name} />
                            <Input inputType="markdown" label="About" value={about} />
                        </div>
                        <div flex="33">
                            <Header as="h4" content="Company Logo" />
                            <FileUpload
                                name="logo"
                                handleChange={this.handleInputChange}
                                headerText="No Logo Added"
                                fileType="fileImage"
                                files={logo}
                                image={logo_url}
                                textAlign="center"
                            />
                        </div>
                    </Flex>
                    <Divider />
                    <Addresses details={address} onChange={this.handleInputChange} />
                    <Form.Group inline widths="equal">
                        <Input label="Twitter" value={twitter} />
                        <Input label="Facebook" value={facebook} />
                    </Form.Group>
                    <Input label="Website URL" name="url" value={url} />
                    <Form.Button>Submit</Form.Button>
                </Form>
            </Segment>
        );
    }
}

const { object } = PropTypes;
EditRoasterProfile.propTypes = {
    profile: object.isRequired
};

export default withContext(EditRoasterProfile);
