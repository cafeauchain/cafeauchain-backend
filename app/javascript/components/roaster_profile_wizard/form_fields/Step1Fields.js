import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
    Button,
    Form,
    Input,
    Image,
    Icon,
    Grid,
    Segment,
    Header,
    TextArea
} from "semantic-ui-react";
import IconHeader from "../../shared/IconHeader";

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
        const { setLogo } = this.props
        files.splice(0, 1, event.target.files[0]);
        this.setState({ files });
        this.getBase64(event.target.files[0], result => {
            setLogo(result);
        });
    };

    fileURL = file => {
        const tempFileUrl = URL.createObjectURL(file);
        return tempFileUrl;
    };

    saveAndContinue = e => {
        const { nextStep } = this.props
        e.preventDefault();
        nextStep();
    };

    render() {
        const { values, renderErrors, handleChange } = this.props;
        return (
            <Grid centered>
                <Grid.Column width={12}>
                    <IconHeader
                        iconName="coffee"
                        header="Create your roaster's profile"
                    />
                    <Form>
                        {renderErrors()}
                        <Form.Field
                            control={Input}
                            label="What is the name of your roaster?"
                            placeholder="Roaster name"
                            onChange={handleChange("name")}
                            defaultValue={values.name}
                        />
                        <Form.Field
                            control={TextArea}
                            label="About"
                            placeholder="Tell us more about your roaster..."
                            onChange={handleChange("about")}
                            defaultValue={values.about}
                        />
                        {values.logo.length == 0 ? (
                            <Segment placeholder>
                                <Form.Field>
                                    <Header icon>
                                        <Icon name="image outline" />
                                        No logo added
                                    </Header>
                                    <input
                                        type="file"
                                        onChange={event => this.uploadFile(event)}
                                        className="input-file"
                                        id="logoFileInput"
                                    />
                                    <label
                                        htmlFor="logoFileInput"
                                        className="ui huge green button"
                                    >
                                        <i className="ui upload icon" />
                                        Upload Logo
                                    </label>
                                </Form.Field>
                            </Segment>
                        ) : (
                            <Segment textAlign="center">
                                <Image
                                    src={values.logo}
                                    size="medium"
                                    rounded
                                    centered
                                    spaced
                                />
                            </Segment>
                        )}
                        <Button
                            type="submit"
                            onClick={this.saveAndContinue}
                            className="ui primary right floated"
                            icon
                            labelPosition="right"
                        >
                            Next Step
                            <Icon name="right arrow" />
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const { func, object } = PropTypes;
Step1Fields.propTypes = {
    setLogo: func,
    renderErrors: func,
    handleChange: func,
    nextStep: func,
    values: object
};

export default Step1Fields;
