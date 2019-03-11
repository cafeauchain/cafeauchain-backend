import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Header, Divider, Dimmer, Loader } from "semantic-ui-react";

import usStates from "../utilities/usStates";
import Input from "../shared/input";
import ImageChange from "../shared/ImageChange";

import readCookie from "../utilities/readCookie";
import API_URL from "../utilities/apiUtils/url";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: props.profile,
            loading: false
        };
    }

    startSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true }, this.handleSubmit);
    };

    handleSubmit = async () => {
        const { details } = this.state;
        const url = `${API_URL}/roasters/${details.id}`;
        const params = {
            roaster_profile: details
        };
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": token
            }
        });
        if (response.status === 200) {
            setTimeout(() => this.setState({ loading: false }), 600);
        } else {
            // eslint-disable-next-line
            console.log("error", response);
        }
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
        const {
            name,
            about,
            address_1,
            address_2,
            city,
            facebook,
            // eslint-disable-next-line
            id,
            state,
            twitter,
            url,
            zip_code,
            img_url
        } = details;

        const Input = this.renderInput;
        return (
            <div className="form roaster-wizard">
                <Dimmer active={loading} inverted>
                    <Loader size="large">Saving</Loader>
                </Dimmer>
                <Header as="h2">Roaster Profile</Header>
                <div>
                    <ImageChange src={img_url} id={id} />
                </div>
                <Divider />
                <Form onSubmit={this.startSubmit}>
                    <Input label="Name" value={name} />

                    <Form.Group inline widths="equal">
                        <Input label="Address 1" value={address_1} />
                        <Input label="Address 2" value={address_2} />
                    </Form.Group>

                    <Form.Group inline widths="equal">
                        <Input label="City" value={city} />
                        <Input label="Zip" value={zip_code} name="zip_code" />
                        <Input inputType="select" label="State" defaultValue={state} options={usStates} />
                    </Form.Group>

                    <Form.Group inline widths="equal">
                        <Input label="Twitter" value={twitter} />
                        <Input label="Facebook" value={facebook} />
                    </Form.Group>

                    <Input label="Website URL" name="url" value={url} />

                    <Input inputType="textarea" label="About" defaultValue={about} />

                    <Form.Button>Submit</Form.Button>
                </Form>
            </div>
        );
    }
}

const { object } = PropTypes;
App.propTypes = {
    profile: object.isRequired
};

export default App;
