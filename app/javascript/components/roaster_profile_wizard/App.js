import React, { Component } from "react";
import { Message } from "semantic-ui-react";

/* eslint-disable */
import { url as API_URL, requester } from "utilities/apiUtils";
/* eslint-enable */

import Step1Fields from "./form_fields/Step1Fields";
import Step2Fields from "./form_fields/Step2Fields";
import Step3Fields from "./form_fields/Step3Fields";
import Confirmation from "./form_fields/Confirmation";

import WizardWrapper from "./formWrapper";

class App extends Component {
    constructor(props) {
        super(props);
        const localStorageState = localStorage.getItem("state");
        if (localStorageState) {
            this.state = JSON.parse(localStorageState);
            this.state.errors = {};
        } else {
            this.state = {
                current_step: 1,
                roaster_profile: {
                    name: "",
                    address_1: "",
                    address_2: "",
                    city: "",
                    state: "",
                    zip_code: "",
                    logo: "",
                    about: "",
                    url: "",
                    twitter: "",
                    facebook: ""
                },
                errors: {}
            };
            this.state.loading = false;
        }
    }

    handleChange = (event, { value, name, checked }) => {
        const { roaster_profile: profile } = this.state;
        let roaster_profile = { ...profile };
        if (name === "") return;
        const val = value || checked;
        roaster_profile[name] = val;
        this.setState({ roaster_profile });
    };

    nextStep = async () => {
        this.setState({ loading: true });
        let { current_step, roaster_profile } = this.state;
        const url = API_URL + "/roasters/validate_step";

        const body = { current_step: "step" + current_step, roaster_profile };
        const response = await requester({ url, body });
        this.setState({ loading: false });
        if (response instanceof Error) {
            this.setState({ errors: response });
        } else {
            current_step = Number(current_step);
            if (current_step < 4) {
                current_step += 1;
                // Set localStorage incase profile creation gets interrupted
                localStorage.setItem("state", JSON.stringify({ roaster_profile, current_step }));
                this.setState({ current_step, errors: {} });
            } else {
                // Remove localStorage on successful submit
                localStorage.removeItem("state");
                window.location.href = response.redirect_url;
            }
        }
    };

    previousStep = () => {
        let { current_step } = this.state;
        current_step = Number(current_step) - 1;
        this.setState({ current_step });
    };

    renderErrors = () => {
        const { errors } = this.state;
        if (Object.keys(errors).length > 0) {
            const errors = [];
            const keys = Object.keys(errors);
            keys.forEach(key => {
                errors.push(key.toString() + " " + errors[key]);
            });
            return (
                <Message warning visible>
                    <Message.Header>There was an issue:</Message.Header>
                    <Message.List items={errors} />
                </Message>
            );
        }
    };

    getWizardSettings = step => {
        let settings = {
            prevFunc: this.previousStep,
            nextFunc: this.nextStep
        };
        switch (Number(step)) {
        case 1:
            settings.prevFunc = null;
            settings.headerText = "Create your roaster's profile";
            break;
        case 2:
            settings.headerText = "Step 2: Location";
            break;
        case 3:
            settings.headerText = "Step 3: Website & Social";
            break;
        case 4:
            settings.headerText = "Confirm your profile info";
            settings.nextText = "Complete Registration";
            break;
        }
        return settings;
    };

    render() {
        // registerServiceWorker();
        const { current_step: step, roaster_profile: profile, loading } = this.state;
        const settings = this.getWizardSettings(step);
        return (
            <div className="form roaster-wizard">
                <WizardWrapper renderErrors={this.renderErrors} {...settings} loading={loading}>
                    {Number(step) === 1 && <Step1Fields handleChange={this.handleChange} values={profile} />}
                    {Number(step) === 2 && <Step2Fields handleChange={this.handleChange} values={profile} />}
                    {Number(step) === 3 && <Step3Fields handleChange={this.handleChange} values={profile} />}
                    {Number(step) === 4 && <Confirmation values={profile} />}
                </WizardWrapper>
            </div>
        );
    }
}

export default App;
