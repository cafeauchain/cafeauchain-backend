import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import { Weights } from "shared/textFormatters";

import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

const days = [
    { id: 'day_0', name: "Sunday" },
    { id: 'day_1', name: "Monday" },
    { id: 'day_2', name: "Tuesday" },
    { id: 'day_3', name: "Wednesday" },
    { id: 'day_4', name: "Thursday" },
    { id: 'day_5', name: "Friday" },
    { id: 'day_6', name: "Saturday" }
];

class Cutoff extends Component {
    state = {
        errors: [],
        btnLoading: false,
        details: {
            day_0: "",
            day_1: "",
            day_2: "",
            day_3: "",
            day_4: "",
            day_5: "",
            day_6: ""
        }
    };

    async componentDidMount(){
        const { userId: id } = this.props;
        let response = await fetch(ROASTER_URL(id) + "/cutoffs");
        response = await response.json();
        const details = Object.keys(response).reduce((obj, item) => {
            if( item.indexOf('day_') > -1 ){
                obj[item] = moment(response[item]).isValid() ? moment.utc(response[item]).format("HH:mm") : "";
            }
            return obj;
        }, {});
        this.setState({ details, cutoffId: response.id });

    }

    handleSubmit = async ev => {
        ev.preventDefault();
        await this.setState({ btnLoading: true });
        const { details, cutoffId } = this.state;
        const { userId } = this.props;
        const body = { ...details };
        let url = `${ROASTER_URL(userId)}/cutoffs`;
        if( cutoffId ) url += "/" + cutoffId;
        const response = await requester({ url, body, method: cutoffId ? 'PUT' : 'POST' });
        this.afterSubmit(response);
    };

    afterSubmit = async response => {
        const { successClose, closeModal } = this.props;
        if (response instanceof Error) {
            this.setState({ errors: response.response.data, btnLoading: false });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                await this.setState({ btnLoading: false });
                const success = "Cutoff Times Updated!";
                if (successClose) {
                    successClose(success);
                } else if (closeModal) {
                    closeModal();
                }
            }
        }
    }

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details, errors: [] });
    };

    render() {
        const { errors, details, btnLoading } = this.state;
        return (
            <Form>
                <p>
                    Set and edit your order cutoff times. If an order is placed before the cutoff time, it will be added
                    to the roast queue for that day. If it is after the cutoff time, it will be added to the queue 
                    for the next roast day. If you do not roast on a specific day, make sure that day is empty. By 
                    default, the cutoff time is set for midnight Monday thru Friday.
                </p>
                <ErrorHandler errors={errors} />
                {days.map(({ id, name }) => {
                    return (
                        <Input 
                            key={id}
                            onChange={this.handleInputChange}
                            name={id}
                            label={name}
                            value={details[id]}
                            type="time"
                        />
                    );
                })}
                <Button primary content="Submit" onClick={this.handleSubmit} loading={btnLoading} />
            </Form>
        );
    }
}
const { string, number, oneOfType, func } = PropTypes;
Cutoff.propTypes = {
    userId: oneOfType([ string, number ]),
    successClose: func,
    closeModal: func
};

export default withContext(Cutoff);
