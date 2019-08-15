import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Dimmer, Loader, Header } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import { requester, url as API_URL } from "utilities/apiUtils";
import { callMeDanger } from "utilities";

import withContext from "contexts/withContext";
/* eslint-enable */

const steps = [
    { text: "Processing", value: 1, key: "processing" },
    { text: "Packed", value: 2, key: "packed" },
    { text: "Shipped", value: 3, key: "shipped" },
    { text: "Fulfilled", value: 4, key: "fulfilled" }
];

class OrderFulfillment extends React.Component {
    constructor(props) {
        super(props);
        const { order: { attributes: { status } } } = props;

        const statusIdx = steps.find(step => step.key === status);
        const statusNum = statusIdx.value;
        this.state = {
            loading: false,
            details: {
                statusNum
            },
            errors: []
        };
    }

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val || "";
        this.setState({ details }, this.handleSubmit);
    };

    handleSubmit = async () => {
        await this.setState({ loading: true });
        const { order: { id } } = this.props;
        const { details: { statusNum } } = this.state;
        const url = API_URL + "/orders/" + id;
        let response = await requester({ url, body: { status: statusNum }, method: "PUT" });
        this.afterSubmit( response );
    };

    afterSubmit = async response => {
        const { updateContext } = this.props;
        setTimeout(async () => {
            if (response instanceof Error) {
                this.setState({ errors: [response.response.data], loading: false });
            } else {
                if (response.redirect) {
                    window.location.href = await response.redirect_url;
                } else {
                    await updateContext({ order: response.data });
                    this.setState({ loading: false });
                }
            }
        }, 400);
    }

    render() {
        const { errors, loading, details } = this.state;
        const { order: { attributes: { order_items } } } = this.props;
        const isPacked = order_items.every(item => item.packed);
        const modifiedSteps = steps.map( item => {
            if (details.statusNum > 1 && item.value === 1) {
                return { ...item, disabled: true };
            }
            return item;
        });
        
        return (
            <F>
                <Header as="h3" content="Order Status" />
                <Dimmer active={loading} inverted content={<Loader />} />
                <ErrorHandler errors={errors} />
                {isPacked && (
                    <Input
                        inputType="select"
                        options={modifiedSteps}
                        name="statusNum"
                        label=""
                        onChange={this.handleInputChange}
                        value={details.statusNum}
                        fluid={false}
                    />
                )}
                {!isPacked && (
                    <div>
                        <strong>Processing</strong>
                        <br />
                        {
                            callMeDanger(`Before you can change the status, you'll need 
                            to pack the line items. You can do this from the `)
                        }
                        <a href="/manage/production">production queue</a>
                    </div>
                )}
            </F>
        );
    }
}

const { object, func } = PropTypes;
OrderFulfillment.propTypes = {
    order: object,
    updateContext: func
};

export default withContext(OrderFulfillment);
