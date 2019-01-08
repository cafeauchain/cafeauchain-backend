import React, { Component } from "react";
import { Form, Container, Header, Divider } from "semantic-ui-react";

import ImageChange from "../roaster_profile/ImageChange";

import usStates from "../utilities/usStates";
import Input from "../shared/input";

const dummy = {
    name: "Joe Smith",
    about: "I am a roaster",
    address_1: "123 Anywhere St",
    address_2: "Suite 200",
    city: "Athens",
    facebook: "joe-smith-roasters",
    id: 4,
    state: "GA",
    twitter: "jsroasters",
    url: "jsroaster.com",
    zip_code: "30606",
    img_url: "https://via.placeholder.com/300x150",
    newsletter: false,
    plan: "Gold"
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: dummy
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
            state,
            twitter,
            zip_code,
            img_url,
            newsletter,
            plan,
            ...rest
        } = details;

        const Input = this.renderInput;
        return (
            <Container className="form roaster-wizard">
                <Header as="h2">Roaster Profile</Header>
                <Container align="center">
                    <ImageChange src={img_url} profile={details} />
                </Container>
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

                    <Input inputType="checkbox" label="Newsletter" defaultChecked={newsletter} />

                    <Input
                        inputType="radio"
                        name="plan"
                        label="plan"
                        dataArray={[
                            {
                                label: "Bronze",
                                value: "Bronze",
                                checked: plan === "Bronze"
                            },
                            {
                                label: "Gold",
                                value: "Gold",
                                checked: plan === "Gold"
                            },
                            {
                                label: "Platinum",
                                value: "Platinum",
                                checked: plan === "Platinum"
                            }
                        ]}
                    />

                    <Form.Button>Submit</Form.Button>
                </Form>
                <div>
                    These properties were not used on the form:
                    {Object.keys(rest).map(item => (
                        <div key={item}>{item + ": " + rest[item]}</div>
                    ))}
                </div>
            </Container>
        );
    }
}

export default App;
