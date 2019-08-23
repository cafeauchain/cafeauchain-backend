import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import { url as API_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class EditRoastDate extends React.Component {
    constructor(props){
        super(props);
        const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");
        this.state = {
            details: {
                roast_date: props.roast_date || tomorrow
            },
            btnLoading: false,
            errors: []
        };
    }
    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ btnLoading: true });
        const { id } = this.props;
        const { details } = this.state;
        const url = API_URL + "/orders/" + id;
        const response = await requester({ url, body: { ...details }, method: "PUT" });
        this.afterSubmit(response);
    }
    afterSubmit = async response => {
        const { updateContext, successClose, closeModal } = this.props;
        const success = "Roast Date Updated!";
        await setTimeout(async () => {
            this.setState({ btnLoading: false });
            if (response instanceof Error) {
                this.setState({ errors: [response.response.data] });
            } else {
                const update = { order: response.data };
                if (response.redirect) {
                    window.location = await response.redirect_url;
                } else {
                    if (successClose) {
                        successClose(success, updateContext, update);
                    } else if (closeModal) {
                        closeModal();
                        updateContext(update);
                    }
                }
            }
        }, 400);
    }

    render() {
        const { details: { roast_date }, btnLoading, errors } = this.state;
        return (
            <Form>
                {errors.length > 0 && <ErrorHandler errors={errors} />}
                <Input 
                    type="date"
                    label="Roast Date"
                    value={roast_date}
                    onChange={this.handleInputChange}
                />
                <Button onClick={this.handleSubmit} content="Update Roast Date" primary loading={btnLoading} />
            </Form>   
        );
    }
}

const { string, oneOfType, number, func } = PropTypes;
EditRoastDate.propTypes = {
    roast_date: string,
    id: oneOfType([ string, number ]),
    closeModal: func,
    successClose: func,
    updateContext: func
};

export default withContext(EditRoastDate);
