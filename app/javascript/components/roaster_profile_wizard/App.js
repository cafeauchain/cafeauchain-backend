import React, { Component } from "react";
import { Container, Message } from "semantic-ui-react";

/* eslint-disable */
import readCookie from "utilities/readCookie";
import transformStateToParams from "utilities/apiUtils/roasterWizardParams";
// import registerServiceWorker from '../utilities/registerServiceWorker';
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
                current_step: "step1",
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
        let { current_step, roaster_profile } = this.state;
        let url = "/api/v1/roasters/validate_step";
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": token
            }
        });
        if (response.status == 200) {
            let stepNumber = parseInt(current_step.split("step")[current_step.split("step").length - 1]);
            stepNumber += 1;
            current_step = "step" + stepNumber;

            // Set localStorage incase profile creation gets interrupted
            const localState = { current_step, roaster_profile };
            localStorage.setItem("state", JSON.stringify(localState));

            this.setState({ current_step, errors: {} });
        } else {
            const res = await response.json();
            await this.setState({ errors: res.errors });
        }
    };

    previousStep = () => {
        let { current_step } = this.state;
        let stepNumber = parseInt(current_step.split("step")[current_step.split("step").length - 1]);
        stepNumber -= 1;
        current_step = "step" + stepNumber;
        this.setState({ current_step });
    };

    submitProfile = async () => {
        let url = "/api/v1/roasters/validate_step";
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": token
            }
        });
        if (response.status == 200) {
            // Remove localStorage on successful submit
            localStorage.removeItem("state");
            const responseJson = await response.json();
            window.location.href = await responseJson.redirect_url;
        } else {
            const res = await response.json();
            await this.setState({ errors: res.errors });
        }
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
        switch (step) {
        case "step1":
            settings.prevFunc = null;
            settings.headerText = "Create your roaster's profile";
            break;
        case "step2":
            settings.headerText = "Step 2: Location";
            break;
        case "step3":
            settings.headerText = "Step 3: Website & Social";
            break;
        case "step4":
            settings.nextFunc = this.submitProfile;
            settings.headerText = "Confirm your profile info";
            settings.nextText = "Complete Registration";
            break;
        }
        return settings;
    };

    render() {
        // registerServiceWorker();
        const { current_step: step, roaster_profile: profile } = this.state;
        const settings = this.getWizardSettings(step);
        return (
            <Container className="form roaster-wizard">
                <WizardWrapper renderErrors={this.renderErrors} {...settings}>
                    {step === "step1" && <Step1Fields handleChange={this.handleChange} values={profile} />}
                    {step === "step2" && <Step2Fields handleChange={this.handleChange} values={profile} />}
                    {step === "step3" && <Step3Fields handleChange={this.handleChange} values={profile} />}
                    {step === "step4" && <Confirmation values={profile} />}
                </WizardWrapper>
            </Container>
        );
    }
}

export default App;
