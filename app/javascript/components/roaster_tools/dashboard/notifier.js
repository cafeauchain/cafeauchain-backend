import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Messager from "shared/messager";

import { callMeDanger } from "utilities";

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
            const msgBuilder = (title, name, low_alert, amount) =>
                callMeDanger(`Your ${title} inventory is low for <strong>${name}</strong>.
                 Your par level is <strong>${low_alert}</strong> but
                 your actual level is <strong>${amount}</strong> lbs.`);
            // TODO Refactor this
            if (low_on_hand && low_on_hand >= on_hand) {
                notifications.push({
                    id: id + "on_hand",
                    message: msgBuilder("On Hand", name, low_on_hand, on_hand),
                    type: "negative"
                });
            }
            if (low_remaining && low_remaining >= in_warehouse) {
                notifications.push({
                    id: id + "in_warehouse",
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
