import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Segment, Header, Icon, Form, Image, Dimmer, Loader } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";

import getDefaults from "defs/defaultUploadFields";

import { fileToImage, fileReader } from "utilities";
/* eslint-enable */

class FileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    uploadFile = async event => {
        const { handleChange, name, fileType, multiple } = this.props;
        const files = event.target.files;
        const file = files[0];
        let value;
        if (fileType === "image") {
            value = await fileToImage(file);
        }
        if (fileType === "csv") {
            value = await fileReader(file);
        }
        if (fileType === "file") {
            value = multiple ? [...files] : file;
        }
        if (fileType === "fileImage") {
            value = multiple ? [...files] : [file];
        }
        this.setState({ loading: true });
        await handleChange(event, { name, value });
        this.clearLoader();
    };

    clearLoader = () => {
        setTimeout(() => this.setState({ loading: false }), 400);
    };

    render() {
        // TODO Clicking cancel when trying to upload causes everything to crash, maybe?
        const { fileType, handleChange, ...rest } = this.props;
        const defaults = getDefaults(fileType);
        const {
            headerIcon = defaults.headerIcon,
            headerText = defaults.headerText,
            id = defaults.id,
            accept = defaults.accept,
            uploadText = defaults.uploadText,
            changeText = defaults.changeText,
            image,
            files,
            textAlign = "center",
            ...left
        } = rest;

        const { loading } = this.state;
        const noImagesAvailable = !(image || files.length);
        return (
            <Segment placeholder={noImagesAvailable} padded={noImagesAvailable ? "very" : false} textAlign={textAlign}>
                <Dimmer inverted active={loading}>
                    <Loader size="large" active={loading} />
                </Dimmer>
                <Form.Field>
                    {(headerIcon || headerText) && noImagesAvailable && (
                        <Header icon textAlign="center">
                            {headerIcon && <Icon name={headerIcon} />}
                            {headerText}
                        </Header>
                    )}
                    {image && !files.length && (
                        <Image src={image} size="medium" rounded centered spaced style={{ marginBottom: 20 }} />
                    )}

                    {fileType === "fileImage" && files.length > 0 && (
                        <Image.Group size={files.length > 2 ? "small" : "medium"}>
                            {files.map(file => (
                                <Image key={file.name} src={URL.createObjectURL(file)} rounded centered spaced />
                            ))}
                        </Image.Group>
                    )}
                    <br />
                    <Input
                        {...left}
                        inputType="file"
                        onChange={this.uploadFile}
                        id={id}
                        accept={accept}
                        label={(
                            <F>
                                <Icon name="upload" />
                                {noImagesAvailable ? uploadText : changeText}
                            </F>
                        )}
                    />
                </Form.Field>
            </Segment>
        );
    }
}

const { func, string, bool, array } = PropTypes;
FileInput.propTypes = {
    handleChange: func.isRequired,
    name: string.isRequired,
    headerIcon: string,
    headerText: string,
    id: string,
    accept: string,
    uploadText: string,
    fileType: string,
    changeText: string,
    image: string,
    multiple: bool,
    files: array
};

export default FileInput;
