import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Message } from "semantic-ui-react";

/* eslint-disable */
import { humanize } from "utilities";

import IconHeader from "shared/IconHeader";
import Details from "shared/details";
import { AsImage } from "shared/textFormatters";
/* eslint-enable */

import WizardWrapper from "../formWrapper";

class Confirmation extends Component {
    state = {};

    confirmFields = values => {
        return Object.keys(values).reduce((arr, item) => {
            if (!values[item]) return arr;
            const formatter = item === "logo" ? props => AsImage({ ...props, size: "small" }) : "";
            return [...arr, { name: item, key: item, formatter }];
        }, []);
    };

    render() {
        const trialEnd = moment()
            .add(30, "days")
            .format("dddd, MMM Do YYYY");
        const { values, ...rest } = this.props;
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
                <Details
                    attributes={values}
                    fields={this.confirmFields(values)}
                    leftStyles={{ width: 100, margin: "10px 0", fontWeight: "bold" }}
                    rightStyles={{ margin: "10px 0" }}
                />
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
