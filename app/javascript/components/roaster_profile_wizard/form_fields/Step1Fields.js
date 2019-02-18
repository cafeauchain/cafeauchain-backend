import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Image, Icon, Segment, Header, Container } from "semantic-ui-react";

/* eslint-disable */
import IconHeader from "shared/IconHeader";
import Input from "shared/input";
import ImageUpload from "shared/ImageUpload";
/* eslint-enable */

const fields = [
    { name: "name", label: "What is the name of your roaster?", placeholder: "Roaster Name" },
    { name: "about", label: "About", placeholder: "Tell us more about your roaster...", inputType: "textarea" }
];

class Step1Fields extends Component {
    state = {
        files: []
    };

    getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            cb(reader.result);
        };
        reader.onerror = function(error) {
            alert("Error: ", error);
        };
    };

    uploadFile = event => {
        let { files } = this.state;
        const { handleChange } = this.props;
        files.splice(0, 1, event.target.files[0]);
        this.setState({ files });
        this.getBase64(event.target.files[0], result => {
            handleChange(event, { name: "logo", value: result });
        });
    };

    fileURL = file => {
        const tempFileUrl = URL.createObjectURL(file);
        return tempFileUrl;
    };

    render() {
        const { values, renderErrors, handleChange, nextStep } = this.props;
        return (
            <Container text>
                <IconHeader iconName="coffee" header="Create your roaster's profile" />
                <Form style={{ margin: "4em 0" }}>
                    {renderErrors()}
                    {fields.map(item => (
                        <Form.Field key={item.name}>
                            <Input
                                label={item.label}
                                placeholder={item.placeholder}
                                name={item.name}
                                defaultValue={values[item.name]}
                                onChange={handleChange}
                                inputType={item.inputType}
                            />
                        </Form.Field>
                    ))}
                    {!values.logo && (
                        <Segment placeholder textAlign="center">
                            <Form.Field>
                                <Header icon>
                                    <Icon name="image outline" />
                                    No logo added
                                </Header>
                                <input
                                    type="file"
                                    onChange={this.uploadFile}
                                    className="input-file"
                                    id="logoFileInput"
                                    name="logo"
                                />
                                <label htmlFor="logoFileInput" className="ui huge green button">
                                    <i className="ui upload icon" />
                                    Upload Logo
                                </label>
                            </Form.Field>
                        </Segment>
                    )}
                    {values.logo && (
                        <Segment textAlign="center">
                            <Image src={values.logo} size="medium" rounded centered spaced />
                        </Segment>
                    )}
                    <Button
                        type="submit"
                        primary
                        floated="right"
                        icon="right arrow"
                        labelPosition="right"
                        content="Next Step"
                        onClick={nextStep}
                    />
                </Form>
            </Container>
        );
    }
}

const { func, object } = PropTypes;
Step1Fields.propTypes = {
    renderErrors: func,
    handleChange: func,
    nextStep: func,
    values: object
};

export default Step1Fields;
