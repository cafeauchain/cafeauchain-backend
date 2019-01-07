import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Container, Header, Image, Divider } from "semantic-ui-react";

import usStates from "../utilities/usStates";
import Input from "../shared/input";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: props.profile
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const { details } = this.state;
        // eslint-disable-next-line
        console.log(details);
    };

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        // const details = { ...this.state.details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val;
        this.setState({ details });
    };

    renderInput = props => <Input {...props} onChange={this.handleInputChange} />;

    render() {
        const { details } = this.state;
        const {
            name,
            about,
            address_1,
            address_2,
            city,
            facebook,
            // eslint-disable-next-line
            id,
            // eslint-disable-next-line
            location,
            state,
            twitter,
            // eslint-disable-next-line
            url,
            zip_code,
            img_url
        } = details;

        const Input = this.renderInput;
        return (
            <Container className="form roaster-wizard">
                <Header as="h2">Roaster Profile</Header>
                <Image src={img_url} />
                <Divider />
                <Form onSubmit={this.handleSubmit}>
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

                    <Input inputType="textarea" label="About" defaultValue={about} />

                    <Input inputType="checkbox" label="Is this true" defaultChecked name="hey" />

                    <Input
                        inputType="radio"
                        name="radioGroup2"
                        label="radioGroup2"
                        dataArray={[
                            {
                                label: "Kyle",
                                value: "Kyle",
                                // eslint-disable-next-line
                                checked: this.state.details.radioGroup2 === "Kyle"
                            },
                            {
                                label: "Jessica",
                                value: "Jessica",
                                // eslint-disable-next-line
                                checked: this.state.details.radioGroup2 === "Jessica"
                            },
                            {
                                label: "Lydia",
                                value: "Lydia",
                                // eslint-disable-next-line
                                checked: this.state.details.radioGroup2 === "Lydia"
                            }
                        ]}
                    />

                    <Form.Button>Submit</Form.Button>
                </Form>
            </Container>
        );
    }
}

const { object } = PropTypes;
App.propTypes = {
    profile: object.isRequired
};

export default App;
