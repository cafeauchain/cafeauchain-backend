import React from "react";
import PropTypes from 'prop-types';

import { Segment, Button, Label } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import { Money } from "shared/textFormatters";
import { humanize } from "utilities";
/* eslint-enable */

class ShippingOptions extends React.Component {
    state = {
        btnLoading: ""
    }

    handleSubmit = async (e, item) => {
        const { target } = e;
        const id = item["data-id"];
        e.preventDefault();
        target.blur();
        await this.setState({ btnLoading: id });
        this.afterSubmit( id );
    }

    afterSubmit = async id => {
        const { updateCartDetails, closeModal, successClose, rates } = this.props;
        setTimeout(async () => {
            const newRate = rates.find(rate => rate.id === id);
            const success = "Shipping updated!";
            await updateCartDetails({ shipping: newRate });
            if (successClose) {
                successClose(success);
            } else if (closeModal) {
                closeModal();
            }
        }, 400);
    }

    render(){
        const { rates, current } = this.props;
        const { btnLoading } = this.state;
        return (
            <div>
                {rates.map( rate => {
                    return (
                        <Segment key={rate.id}>
                            {current.id === rate.id && (
                                <Label icon="clipboard check" corner="right" color="green" />
                            )}
                            <Flex spacing="10" wrap>
                                <div flex="25"><strong>Carrier: </strong></div>
                                <div flex="75">{rate.carrier}</div>
                                <div flex="25"><strong>Service: </strong></div>
                                <div flex="75">{humanize(rate.service, true)}</div>
                                <div flex="25"><strong>Price: </strong></div>
                                <div flex="75">
                                    <Money>
                                        {rate.retail_rate}
                                    </Money>
                                </div>
                                <div flex="25"><strong>Speed: </strong></div>
                                <div flex="75">
                                    {rate.est_delivery_days ? rate.est_delivery_days + " days" : "Unknown"}
                                </div>
                            </Flex> 
                            <br />
                            <Flex flexend>
                                <Button
                                    primary
                                    content={"Choose " + rate.carrier + " " + humanize(rate.service, true)}
                                    onClick={this.handleSubmit}
                                    data-id={rate.id}
                                    loading={btnLoading === rate.id}
                                />
                            </Flex>
                            
                        </Segment>
                    );
                })}
            </div>
        );
    }
}
const { array, func, object } = PropTypes;
ShippingOptions.propTypes = {
    rates: array,
    updateCartDetails: func,
    closeModal: func,
    successClose: func,
    current: object
};

export default ShippingOptions;