import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, Container } from "semantic-ui-react";

/* eslint-disable */
import IconHeader from "shared/IconHeader";
/* eslint-enable */

class Step3Fields extends Component {
    state = {};

    render() {
        const { values, renderErrors, handleChange, previousStep, nextStep } = this.props;
        return (
            <Container text>
                <IconHeader iconName="coffee" header="Step 3: Website & Social" />
                <Form style={{ margin: "4em 0" }}>
                    {renderErrors()}
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
                    <Button
                        type="button"
                        onClick={previousStep}
                        icon="left arrow"
                        labelPosition="left"
                        content="Previous Step"
                    />
                    <Button
                        type="submit"
                        onClick={nextStep}
                        primary
                        floated="right"
                        icon="right arrow"
                        labelPosition="right"
                        content="Next Step"
                    />
                </Form>
            </Container>
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
