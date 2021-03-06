import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
/* eslint-enable */

class Step3Fields extends Component {
    renderInputs = props => {
        const { handleChange, values } = this.props;
        return <Input {...props} onChange={handleChange} defaultValue={values[props.name]} autoComplete="off" />;
    };

    render() {
        const Inner = this.renderInputs;
        return (
            <Form.Group widths="equal">
                <Inner name="url" inputLabel="http://" placeholder="URL" label="What is your website address?" />
                <Inner name="twitter" label="What is your Twitter handle?" placeholder="Twitter" />
                <Inner name="facebook" label="What is your Facebook link?" placeholder="Facebook" />
            </Form.Group>
        );
    }
}

const { func, object } = PropTypes;
Step3Fields.propTypes = {
    handleChange: func,
    values: object
};

export default Step3Fields;
