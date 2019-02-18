import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Button, Form, Image, List, Message, Container } from "semantic-ui-react";

/* eslint-disable */
import { humanize } from "utilities";
import IconHeader from "shared/IconHeader";
/* eslint-enable */

class Confirmation extends Component {
    state = {};

    renderProfileItems = () => {
        const { values } = this.props;
        return Object.keys(values).map(key => {
            return (
                <List.Item key={key}>
                    <List.Header>{humanize(key)}</List.Header>
                    <List.Content>
                        {key === "logo" ? <Image src={values[key]} size="small" /> : values[key]}
                    </List.Content>
                </List.Item>
            );
        });
    };

    render() {
        const trialEnd = moment()
            .add("days", 30)
            .format("dddd, MMM Do YYYY");
        const { previousStep, submitProfile } = this.props;
        return (
            <Container text>
                <Form style={{ margin: "4em 0" }}>
                    <IconHeader iconName="coffee" header="Confirm your profile info" />
                    <Message info>
                        <Message.Header>Complete your registration</Message.Header>
                        <Message.List>
                            <Message.Item>
                                Start your free 30-day trial, ending&nbsp;
                                {trialEnd}
                            </Message.Item>
                            <Message.Item>
                                During your trial, you can track up to 500 lbs of green coffee through the roasting
                                process for free
                            </Message.Item>
                            <Message.Item>
                                We don‘t need a credit card for your trial, but we recommend you add one so you don‘t
                                experience an interruption
                            </Message.Item>
                        </Message.List>
                    </Message>
                    <List>{this.renderProfileItems()}</List>
                    <Button
                        type="button"
                        onClick={previousStep}
                        icon="left arrow"
                        labelPosition="left"
                        content="Previous Step"
                    />
                    <Button
                        type="submit"
                        onClick={submitProfile}
                        primary
                        floated="right"
                        icon="right arrow"
                        labelPosition="right"
                        content="Complete Registration"
                    />
                </Form>
            </Container>
        );
    }
}

const { func, object } = PropTypes;
Confirmation.propTypes = {
    submitProfile: func,
    previousStep: func,
    values: object
};

export default Confirmation;
