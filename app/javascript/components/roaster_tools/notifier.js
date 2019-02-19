import React, { Component } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Messager from "shared/messager";

import Lots from "contexts/lots";
/* eslint-enable */

const Wrapper = props => <Lots>{lots => <Notifier {...props} lots={lots.data} />}</Lots>;

class Notifier extends Component {
    checkQuantities = lots => {
        return lots.reduce((notifications, lot) => {
            const {
                id,
                attributes: { name, in_warehouse, low_on_hand, low_remaining, on_hand }
            } = lot;
            const msgBuilder = (title, name, low_alert, amount) => {
                return `Your ${title} Inventory is low for ${name}.
                Your alert level is set to ${low_alert} lbs and your actual level is ${amount} lbs`;
            };
            // TODO Refactor this
            if (low_on_hand && low_on_hand >= on_hand) {
                notifications.push({
                    id: id + "on_hand",
                    // eslint-disable-next-line
                    message: msgBuilder("On Hand", name, low_on_hand, on_hand),
                    type: "negative"
                });
            }
            if (low_remaining && low_remaining >= in_warehouse) {
                notifications.push({
                    id: id + "in_warehouse",
                    // eslint-disable-next-line
                    message: msgBuilder("Warehouse", name, low_remaining, in_warehouse),
                    type: "negative"
                });
            }
            return notifications;
        }, []);
    };

    render() {
        const { lots } = this.props;
        const notifications = this.checkQuantities(lots);
        if (!notifications.length) return null;
        return <Messager header="Inventory Alerts" messages={notifications} />;
    }
}

const { array } = PropTypes;
Notifier.propTypes = {
    lots: array
};

export default Wrapper;
