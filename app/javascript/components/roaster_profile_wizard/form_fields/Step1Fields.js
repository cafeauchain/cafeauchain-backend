import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import * as Showdown from "showdown"

/* eslint-disable */
import Input from "shared/input";
import FileUpload from "shared/fileUpload";
/* eslint-enable */

class Step1Fields extends Component {
    converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    renderInputs = props => {
        const { handleChange, values } = this.props;
        return <Input {...props} onChange={handleChange} defaultValue={values[props.name]} autoComplete="off" />;
    };


    render() {
        const {
            handleChange,
            values: { logo }
        } = this.props;
        const Inner = this.renderInputs;
        return (
            <F>
                <Inner name="name" label="What is the name of your roaster?" placeholder="Roaster Name" />
                <Inner
                    name="about"
                    label="About"
                    placeholder="Tell us more about your roaster..."
                    inputType="textarea"
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(this.converter.makeHtml(markdown))
                    }
                />
                <FileUpload handleChange={handleChange} name="logo" fileType="image" image={logo} />
            </F>
        );
    }
}

const { func, object } = PropTypes;
Step1Fields.propTypes = {
    handleChange: func,
    values: object
};

export default Step1Fields;
