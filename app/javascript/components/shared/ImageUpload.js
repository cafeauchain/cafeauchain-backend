import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import readCookie from "../utilities/readCookie";
import API_URL from "../utilities/apiUtils/url";

class LogoUpload extends Component {
    getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            // eslint-disable-next-line
            console.log("in function", reader.result);
            cb(reader.result);
        };
        reader.onerror = function(error) {
            // eslint-disable-next-line
            console.log("Error: ", error);
        };
    };

    uploadFile = event => {
        const { handleLoader } = this.props;
        handleLoader(
            { loading: true },
            this.getBase64(event.target.files[0], result => {
                this.nextStep({ logo: result });
            })
        );
    };

    nextStep = async ({ logo }) => {
        let { id, handleImage } = this.props;
        let url = `${API_URL}/roasters/${id}`;
        const params = {
            roaster_profile: { logo }
        };
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": token
            }
        });
        if (response.status === 200) {
            // eslint-disable-next-line
            console.log(response);
            setTimeout(() => handleImage({ src: logo, loading: false }), 600);
        } else {
            // eslint-disable-next-line
            console.log("error", response);
        }
    };

    render() {
        return (
            <Form>
                <Form.Field inline>
                    <input
                        type="file"
                        onChange={this.uploadFile}
                        className="inputfile"
                        id="logoFileInput"
                        accept=".jpg,.jpeg,.png image/*"
                    />
                    <label htmlFor="logoFileInput" className="ui primary button">
                        <i className="ui upload icon" />
                        Upload Logo
                    </label>
                </Form.Field>
            </Form>
        );
    }
}

const { oneOfType, string, number, func } = PropTypes;
LogoUpload.propTypes = {
    id: oneOfType([string, number]),
    handleLoader: func,
    handleImage: func
};
export default LogoUpload;
