import React, { Component } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Messager from "shared/messager";

import { callMeDanger } from "utilities";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => <Context>{ctx => <Notifier {...props} inventory={ctx.inventory} />}</Context>;

class Notifier extends Component {
    checkQuantities = inventory => {
        return inventory.reduce((notifications, item) => {
            const {
                id,
                attributes: { lot_name, name, quantity, par_level }
            } = item;
            const msgBuilder = (name, par_level, quantity) =>
                callMeDanger(`Your inventory is low for <strong>${name}</strong>.
                 Your par level is <strong>${par_level}</strong> but
                 your actual level is <strong>${quantity}</strong> lbs.`);

            // TODO Refactor this
            if (par_level && par_level >= quantity) {
                notifications.push({
                    id: id + name,
                    message: msgBuilder(lot_name + " " + name, par_level, quantity),
                    type: "negative"
                });
            }
            return notifications;
        }, []);
    };

    render() {
        const { inventory } = this.props;
        const notifications = this.checkQuantities(inventory);
        if (!notifications.length) return null;
        return <Messager header="Roasted Inventory Alerts" messages={notifications} />;
    }
}

const { array } = PropTypes;
Notifier.propTypes = {
    inventory: array
};

export default Wrapper;
