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
        const { id, attributes: { order_date, terms, status, order_total, roast_date } } = this.props;
        return (
            <F>
                <Header as="h2">{"Order #" + id}</Header>
                <Flex spacing="10" spacebetween wrap>
                    <div flex="50">
                        <strong>Date: </strong>
                    </div>
                    <div flex="50">{moment(order_date).format("MMM D, YYYY")}</div>
                    <div flex="50">
                        <strong>Roast Date: </strong>
                    </div>
                    <div flex="50">
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
                        <strong>Balance Due:</strong>
                    </div>
                    <div flex="50">
                        <Money type="positive">{order_total}</Money>
                    </div>
                </Flex>
            </F>
        );
    }
}

const { object, oneOfType, number, string } = PropTypes;
OrderDetails.propTypes = {
    id: oneOfType([number, string]),
    attributes: object
};

export default OrderDetails;
