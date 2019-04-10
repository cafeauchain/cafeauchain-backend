import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Header, Image, Message, Segment } from "semantic-ui-react";

/* eslint-disable */
import fields from "defs/forms/login";
import messaging from "./messaging";

import Input from "shared/input";
import Flex from "shared/flex";

import { capitalize, humanize } from "utilities";
import { requester } from "utilities/apiUtils";

import logo from "images/cac-unofficial-logo.png";
/* eslint-enable */

class Login extends Component {
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
        const { url, token } = this.props;
        const { details } = this.state;
        const method = token ? "PUT" : "POST";
        let body = { user: { ...details } };
        if (token) body = {...details, token};
        
        const response = await requester({ url, body, method });
        if( response instanceof Error ){
            this.setState({ error: response.response.error });
        } else {
            window.location.href = await response.redirect_url;
        }
    };

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details });
    };

    renderInputs = inputs =>
        inputs.map(input => (
            <Input
                {...input}
                key={input.label}
                onChange={this.handleInputChange}
                iconPosition="left"
                labelPosition="left"
                autoComplete="off"
            />
        ));

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

    render() {
        const { fieldType } = this.props;
        const text = messaging[fieldType];
        return (
            <div className="text-wrapper">
                <Segment>
                    <Flex spacing="10" wrap centerboth>
                        <div>
                            <Image src={logo} size="mini" />
                        </div>
                        <div>
                            <Header as="h2" textAlign="center">
                                {text.heading}
                            </Header>
                        </div>
                    </Flex>
                </Segment>
                {this.renderErrors()}
                <Form size="large" onSubmit={this.handleSubmit} style={{ textAlign: "left" }}>
                    <Segment>
                        {this.renderInputs(fields[fieldType])}
                        <Button fluid size="large" primary>
                            {capitalize(humanize(fieldType))}
                        </Button>
                    </Segment>
                </Form>
                <Message className="text-centered">
                    <span>{`${text.message} `}</span>
                    <a href={text.url}>{text.linkText}</a>
                </Message>
            </div>
        );
    }
}
const { string } = PropTypes;
Login.propTypes = {
    url: string,
    fieldType: string,
    token: string
};

export default Login;
