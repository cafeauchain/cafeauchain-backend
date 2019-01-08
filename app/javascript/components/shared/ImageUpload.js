import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import readCookie from "../utilities/readCookie";

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
        this.getBase64(event.target.files[0], result => {
            this.nextStep({ logo: result });
        });
    };

    nextStep = async ({ logo }) => {
        let { profile } = this.props;
        profile = { ...profile, logo };
        // TODO Probably just need an UPDATE (PUT) endpoint
        let current_step = "step1";
        let url = "/api/v1/roasters/validate_step";
        const params = {
            roaster_profile: profile,
            current_step
        };
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": token
            }
        });
        if (response.status === 200) {
            // eslint-disable-next-line
            console.log(response);
        } else {
            // eslint-disable-next-line
            console.log("error", response);
        }
    };

    render() {
        return (
            <Form>
                <Form.Field>
                    <input
                        type="file"
                        onChange={this.uploadFile}
                        className="inputfile"
                        id="logoFileInput"
                        accept=".jpg,.jpeg,.png image/*"
                    />
                    <label htmlFor="logoFileInput" className="ui huge green button">
                        <i className="ui upload icon" />
                        Upload Logo
                    </label>
                </Form.Field>
            </Form>
        );
    }
}

const { object } = PropTypes;
LogoUpload.propTypes = {
    profile: object
};
export default LogoUpload;
