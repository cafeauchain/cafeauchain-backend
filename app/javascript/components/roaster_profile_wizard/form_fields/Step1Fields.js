import React, { Component } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Input from "shared/input";
import FileUpload from "shared/fileUpload";
/* eslint-enable */

import WizardWrapper from "../formWrapper";

class Step1Fields extends Component {
    renderInputs = props => {
        const { handleChange, values } = this.props;
        return <Input {...props} onChange={handleChange} defaultValue={values[props.name]} autoComplete="off" />;
    };

    render() {
        const { values, handleChange, ...rest } = this.props;
        const Inner = this.renderInputs;
        return (
            <WizardWrapper {...rest}>
                <Inner name="name" label="What is the name of your roaster?" placeholder="Roaster Name" />
                <Inner
                    name="about"
                    label="About"
                    placeholder="Tell us more about your roaster..."
                    inputType="textarea"
                />
                <FileUpload handleChange={handleChange} name="logo" fileType="image" />
            </WizardWrapper>
        );
    }
}

const { func, object, string } = PropTypes;
Step1Fields.propTypes = {
    handleChange: func,
    values: object,
    renderErrors: func,
    nextFunc: func,
    header: string
};

export default Step1Fields;
