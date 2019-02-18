import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Image, List, Message } from "semantic-ui-react";

/* eslint-disable */
import { humanize } from "utilities";
import IconHeader from "shared/IconHeader";
/* eslint-enable */

import WizardWrapper from "../formWrapper";

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
            .add(30, "days")
            .format("dddd, MMM Do YYYY");
        const { ...rest } = this.props;
        return (
            <WizardWrapper {...rest}>
                <Message info>
                    <Message.Header>Complete your registration</Message.Header>
                    <Message.List>
                        <Message.Item>
                            Start your free 30-day trial, ending&nbsp;
                            {trialEnd}
                        </Message.Item>
                        <Message.Item>
                            During your trial, you can track up to 500 lbs of green coffee through the roasting process
                            for free
                        </Message.Item>
                        <Message.Item>
                            We don‘t need a credit card for your trial, but we recommend you add one so you don‘t
                            experience an interruption
                        </Message.Item>
                    </Message.List>
                </Message>
                <List>{this.renderProfileItems()}</List>
            </WizardWrapper>
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
