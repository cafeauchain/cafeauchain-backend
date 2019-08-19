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
        this.state = {
            loading: false,
            errors: []
        };
    }

    handleInputChange = (event, { value }) => {
        this.handleSubmit( value );
    };

    handleSubmit = async (statusNum) => {
        await this.setState({ loading: true });
        const { order: { id } } = this.props;
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

    getStatusNumFromStatus = status => {
        const statusIdx = steps.find(step => step.key === status);
        return statusIdx.value;
    }

    render() {
        const { errors, loading } = this.state;
        const { order: { attributes: { order_items, status } } } = this.props;
        const statusNum = this.getStatusNumFromStatus(status);
        const isPacked = order_items.every(item => item.packed);
        const modifiedSteps = steps.map( item => {
            if (statusNum > 1 && item.value === 1) {
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
                        value={statusNum}
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
