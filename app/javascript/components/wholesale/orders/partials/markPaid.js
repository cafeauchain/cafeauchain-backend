import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";

/* eslint-disable */
import ErrorHandler from "shared/errorHandler";
import Input from "shared/input";

import { url as API_URL, requester } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class MarkPaid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnLoading: false,
            errors: [],
            details: {
                memo: ""
            }
        };
    }
    handleInputChange = (e, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details });
    };
    handleMarkPaid = async e => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ btnLoading: true });
        const { invoice_id } = this.props;
        const { details: { memo } } = this.state;
        const url = API_URL + "/invoices/" + invoice_id;
        const body = { status: "paid_in_full", memo };
        const response = await requester({ url, body, method: "PUT" });
        this.afterSubmit(response);
    }
    afterSubmit = response => {
        setTimeout(async () => {
            this.setState({ btnLoading: false });
            if (response instanceof Error) {
                this.setState({ errors: [response.response.message] });
            } else {
                const { updateContext } = this.props;
                await updateContext({ order: response.data });
            }
        }, 400);
    }
    render() {
        const { errors, btnLoading, details } = this.state;
        return (
            <Form>
                <ErrorHandler errors={errors} />
                <Input
                    onChange={this.handleInputChange}
                    name="memo"
                    label="Payment Memo"
                    value={details.memo}
                />
                <Button
                    content="Mark Paid"
                    onClick={this.handleMarkPaid}
                    loading={btnLoading}
                />
            </Form>
        );
    }
}

const { func, oneOfType, number, string } = PropTypes;
MarkPaid.propTypes = {
    invoice_id: oneOfType([ number, string ]),
    updateContext: func
};

export default withContext(MarkPaid);
