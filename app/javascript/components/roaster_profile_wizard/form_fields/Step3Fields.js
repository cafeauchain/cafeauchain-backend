import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";

/* eslint-disable */
/* eslint-enable */

import WizardWrapper from "../formWrapper";

class Step3Fields extends Component {
    state = {};

    render() {
        const { values, handleChange, ...rest } = this.props;
        return (
            <WizardWrapper {...rest}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>What is your website address?</label>
                        <Input
                            name="url"
                            label="http://"
                            placeholder="URL"
                            onChange={handleChange}
                            defaultValue={values.url}
                        />
                    </Form.Field>
                    <Form.Field
                        control={Input}
                        name="twitter"
                        label="What is your Twitter handle?"
                        placeholder="Twitter"
                        onChange={handleChange}
                        defaultValue={values.twitter}
                    />
                    <Form.Field
                        control={Input}
                        name="facebook"
                        label="What is your Facebook link?"
                        placeholder="Facebook"
                        onChange={handleChange}
                        defaultValue={values.facebook}
                    />
                </Form.Group>
            </WizardWrapper>
        );
    }
}

const { func, object } = PropTypes;

Step3Fields.propTypes = {
    renderErrors: func,
    handleChange: func,
    nextStep: func,
    previousStep: func,
    values: object
};

export default Step3Fields;
