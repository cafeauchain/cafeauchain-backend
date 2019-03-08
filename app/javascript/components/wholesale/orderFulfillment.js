import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Step, Icon, Dimmer, Loader, Header } from "semantic-ui-react";

/* eslint-disable */
import { requester, url as API_URL } from "utilities/apiUtils";

import ErrorHandler from "shared/errorHandler";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = ({ ...props }) => {
    return (
        <Context>
            {ctx => (
                <OrderFulfillment
                    {...props}
                    order={ctx.order || props.order}
                    loading={ctx.loading}
                    userId={ctx.userId}
                    getCtxData={ctx.getData}
                    updateContext={ctx.updateContext}
                />
            )}
        </Context>
    );
};

Wrapper.propTypes = {
    order: PropTypes.object
};

class OrderFulfillment extends React.Component {
    static propTypes = () => {
        const { object, oneOfType, number, string } = PropTypes;
        return {
            order: object,
            id: oneOfType([number, string]),
            status: string
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            btnLoading: false
        };
    }

    onClick = async (e, status) => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        await this.setState({ btnLoading: true });
        const { id, updateContext } = this.props;
        const url = API_URL + "/orders/" + id;
        let response = await requester({ url, body: { status }, method: "PUT" });
        setTimeout(async () => {
            if (response instanceof Error) {
                this.setState({ errors: response.response.data, btnLoading: false });
            } else {
                if (response.redirect) {
                    window.location.href = await response.redirect_url;
                } else {
                    await updateContext({ order: response.data.data });
                    this.setState({ btnLoading: false });
                }
            }
        }, 400);
    };

    render() {
        const { errors, btnLoading } = this.state;
        const steps = [
            { name: "processing", icon: "unordered list", title: "Received", index: 0 },
            { name: "awaiting_payment", icon: "payment", title: "Paid", index: 1 },
            { name: "fulfilled", icon: "coffee", title: "Roasted", index: 2 },
            { name: "complete", icon: "truck", title: "Shipped", index: 3 }
        ];
        const { status } = this.props;
        const statusIdx = steps.find(step => step.name === status);
        const statusNum = statusIdx.index;
        return (
            <F>
                <Header as="h3" content="Order Status" />
                <Dimmer active={btnLoading} inverted content={<Loader />} />
                <ErrorHandler errors={errors} />
                <Step.Group fluid>
                    {steps.map(({ name, icon, title, index }) => {
                        const color = index <= statusNum ? "green" : "grey";
                        const future = index > statusNum;
                        return (
                            <Step key={name} active={future} onClick={e => this.onClick(e, index + 1)}>
                                <Icon name={icon} color={color} />
                                <Step.Content>
                                    <Step.Title style={{ color }}>{title}</Step.Title>
                                </Step.Content>
                            </Step>
                        );
                    })}
                </Step.Group>
            </F>
        );
    }
}

export default Wrapper;
