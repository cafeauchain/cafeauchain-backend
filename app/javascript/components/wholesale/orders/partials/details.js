import React, { Fragment as F, PureComponent } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";
import moment from "moment";

/* eslint-disable */
import Flex from "shared/flex";
import { Money } from "shared/textFormatters";
import Modal from "shared/modal";
import EditRoastDate from "wholesale/orders/partials/editRoastDate";

import { humanize } from "utilities";
/* eslint-enable */

class OrderDetails extends PureComponent {
    render() {
        const { id, attributes: { order_date, terms, status, order_total, roast_date }, isCustomer } = this.props;
        const title = isCustomer ? "Invoice #" + id : "Order #" + id;
        return (
            <F>
                <Header as="h2">{title}</Header>
                <Flex spacing="10" spacebetween wrap>
                    <div flex="50">
                        <strong>Date: </strong>
                    </div>
                    <div flex="50">{moment(order_date).format("MMM D, YYYY")}</div>
                    <div flex="50">
                        <strong>Roast Date: </strong>
                    </div>
                    <div flex="50">
                        {isCustomer && moment(roast_date).format("MMM D, YYYY")}
                        {!isCustomer && (
                            <Modal
                                text={moment(roast_date).format("MMM D, YYYY")}
                                title="Edit Roast Date"
                                unstyled
                                className="link"
                                size="mini"
                                component={(
                                    <EditRoastDate id={id} roast_date={roast_date} />
                                )}
                            />
                        )}
                    </div>
                    <div flex="50">
                        <strong>Terms:</strong>
                    </div>
                    <div flex="50">{terms}</div>
                    <div flex="50">
                        <strong>Status:</strong>
                    </div>
                    <div flex="50">{humanize(status)}</div>
                    <div flex="50">
                        <strong>Order Total:</strong>
                    </div>
                    <div flex="50">
                        <Money type="positive">{order_total}</Money>
                    </div>
                </Flex>
            </F>
        );
    }
}

const { object, oneOfType, number, string, bool } = PropTypes;
OrderDetails.propTypes = {
    id: oneOfType([number, string]),
    attributes: object,
    isCustomer: bool
};

export default OrderDetails;
