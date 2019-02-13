import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";

/* eslint-disable */
import fields from "defs/forms/login";
import messaging from "./messaging";

import Input from "shared/input";

import readCookie from "utilities/readCookie";
import capitalize from "utilities/capitalize";
import humanize from "utilities/humanize";

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
        const { url } = this.props;
        const { details } = this.state;
        const body = {
            user: { ...details }
        };
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
        } else {
            this.setState({ error: respJSON.error });
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
            <Grid
                textAlign="center"
                style={{ height: "100%", margin: "auto 0", padding: "4em 0" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header
                        as="h2"
                        textAlign="center"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <Image src={logo} style={{ marginRight: 10 }} />
                        <span>{text.heading}</span>
                    </Header>
                    {this.renderErrors()}
                    <Form size="large" onSubmit={this.handleSubmit} style={{ textAlign: "left" }}>
                        <Segment>
                            {this.renderInputs(fields[fieldType])}
                            <Button fluid size="large" primary>
                                {capitalize(fieldType)}
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        <span>
                            {text.message}
                            {' '}
                        </span>
                        <a href={text.url}>{text.linkText}</a>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}
const { string } = PropTypes;
Login.propTypes = {
    url: string,
    fieldType: string
};

export default Login;
