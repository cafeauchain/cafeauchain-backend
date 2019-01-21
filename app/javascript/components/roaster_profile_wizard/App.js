import React, { Component } from 'react';
import { Container, Message } from 'semantic-ui-react';
import readCookie from '../utilities/readCookie';
import transformStateToParams from '../utilities/apiUtils/roasterWizardParams';
import registerServiceWorker from '../utilities/registerServiceWorker';
import Step1Fields from './form_fields/Step1Fields';
import Step2Fields from './form_fields/Step2Fields';
import Step3Fields from './form_fields/Step3Fields';
import Confirmation from './form_fields/Confirmation';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current_step: "step1",
            name: "",
            logo: "",
            about: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            zip_code: "",
            url: "",
            twitter: "",
            facebook: "",
            errors: {}
        }
    }

    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    setLogo = logo => {
        this.setState({logo})
    }

    handleState = state => {
        this.setState({state})
    }

    nextStep = async () => {
        let { current_step } = this.state;
        let url = "/api/v1/roasters/validate_step"
        const params = transformStateToParams(this.state)
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': token
            },
        })
        if (response.status == 200) {
            let stepNumber = parseInt(current_step.split('step')[current_step.split('step').length -1]);
            stepNumber += 1;
            current_step = "step" + stepNumber
            this.setState({ current_step, errors: {} })
        } else {
            const res = await response.json()
            await this.setState({errors: res.errors})
        }
    }

    previousStep = () => {
        let { current_step } = this.state;
        let stepNumber = parseInt(current_step.split('step')[current_step.split('step').length -1]);
        stepNumber -= 1;
        current_step = "step" + stepNumber
        this.setState({ current_step })
    }

    submitProfile = async () => {
        let url = "/api/v1/roasters/validate_step"
        const params = transformStateToParams(this.state)
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': token
            },
        })
        if (response.status == 200) {
            const responseJson = await response.json()
            window.location.href = await responseJson.redirect_url
        } else {
            const res = await response.json()
            await this.setState({errors: res.errors})
        }
    }

    renderCurrentStep = () => {
        const {current_step} = this.state;
        const { name, logo, about, address_1, address_2, city, state, zip_code, url, twitter, facebook } = this.state;
        const values = { name, logo, about, address_1, address_2, city, state, zip_code, url, twitter, facebook};
        switch(current_step) {
        case "step1":
            return (
                <Step1Fields
                    handleChange = {this.handleChange}
                    setLogo={this.setLogo}
                    nextStep={this.nextStep}
                    values={values}
                    renderErrors={this.renderErrors}
                />
            )
        case "step2":
            return (
                <Step2Fields
                    handleChange={this.handleChange}
                    handleState={this.handleState}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    values={values}
                    renderErrors={this.renderErrors}
                />
            )
        case "step3":
            return (
                <Step3Fields
                    handleChange={this.handleChange}
                    values={values}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    renderErrors={this.renderErrors}
                />
            )
        case "step4":
            return (
                <Confirmation
                    values={values}
                    previousStep={this.previousStep}
                    submitProfile={this.submitProfile}
                />
            )
        }
    }

    renderErrors = () => {
        if (Object.keys(this.state.errors).length > 0) {
            const errors = []
            const keys = Object.keys(this.state.errors)
            keys.forEach(key => {
                errors.push(key.toString() + " " + this.state.errors[key])
            })
            console.log("Errors: ", errors)
            return (
                <Message warning visible>
                    <Message.Header>There was an issue:</Message.Header>
                    <Message.List items={errors} />
                </Message>
            )
        }
    }
        
    render(){
        registerServiceWorker();
        return(
            <Container textAlign='center' className="form roaster-wizard">
                {this.renderCurrentStep()}
            </Container>
        )
    }
}

export default App;