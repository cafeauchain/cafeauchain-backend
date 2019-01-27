import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Message } from 'semantic-ui-react'
import fields from "../../shared/producers/fields";
import Input from "../../shared/input";

import readCookie from "../../utilities/readCookie";
import capitalize from "../../utilities/capitalize";
import humanize from "../../utilities/humanize";
import transformStateToParams from '../../utilities/apiUtils/producerParams';

class CreateProducer extends Component {
    constructor(props) {
        super(props);
        const details = this.buildDetails(fields[props.fieldType]);
        this.state = {
            details,
            error: {}
        };
    }

    buildDetails = details => {
        let obj = {};
        for (const field of details) {
            obj[field.label.replace(" ", "_").toLowerCase()] = "";
        }
        return obj;
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { url } = this.props;
        const { details } = this.state;
        const body = transformStateToParams(details);
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": token
            }
        });
        let respJSON = await response.json();
        if (response.ok) {
            window.location.href = await respJSON.redirect_url;
            // eslint-disable-next-line
            console.log(respJSON)
        } else {
            this.setState({ error: respJSON.error });
            // eslint-disable-next-line
            console.log(respJSON)
        }
    };

    renderErrors = () => {
        const { error } = this.state;
        const errorArray = Object.keys(error);
        if (error && errorArray.length) {
            const errors = error.message
                ? [error.message]
                : errorArray.map(e => humanize(capitalize(e)) + " " + error[e][0]);
            const header = errorArray.length > 1 ? "were errors" : "was an error";

            return <Message size="tiny" error header={`There ${header}:`} list={errors} />;
        }
    };

    renderInputs = inputs =>
        inputs.map(input => (
            <Input
                {...input}
                key={input.label}
                onChange={this.handleInputChange}
                iconPosition="left"
                labelPosition="left"
            />
        ));

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val;
        this.setState({ details });
    };

    render = () => {
        const { fieldType } = this.props
        return(

            <Form size="large" onSubmit={this.handleSubmit} style={{ textAlign: "left" }}>
                {this.renderErrors()}
                {this.renderInputs(fields[fieldType])}
                <Button fluid size="large" primary>
                    {humanize(fieldType)}
                </Button>
            </Form>
        )
    }
}

const { string } = PropTypes;
CreateProducer.propTypes = {
    url: string,
    fieldType: string
};

export default CreateProducer;