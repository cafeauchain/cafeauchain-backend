import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Message } from "semantic-ui-react";
import * as Showdown from "showdown";

/* eslint-disable */
import { humanize } from "utilities";

import IconHeader from "shared/IconHeader";
import Details from "shared/details";
import { AsImage } from "shared/textFormatters";

import { callMeDanger } from "utilities";
/* eslint-enable */

const LongText = ({ content }) => {
    const converter = new Showdown.Converter();
    return callMeDanger(converter.makeHtml(content), "div");
};
const { string } = PropTypes;
LongText.propTypes = {
    content: string
};

const SmallImage = props => <AsImage {...props} size="small" />;

class Confirmation extends Component {
    confirmFields = values => {
        return Object.keys(values).reduce((arr, item) => {
            if (!values[item]) return arr;
            let formatter = "";
            switch (item) {
            case "logo":
                formatter = SmallImage;
                break;
            case "about":
                formatter = LongText;
                break;
            }
            return [...arr, { name: item, key: item, formatter }];
        }, []);
    };

    render() {
        const trialEnd = moment()
            .add(30, "days")
            .format("dddd, MMM Do YYYY");
        const { values } = this.props;
        return (
            <F>
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
            </F>
        );
    }
}

const { object } = PropTypes;
Confirmation.propTypes = {
    values: object
};

export default Confirmation;
