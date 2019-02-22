import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Messager from "shared/messager";

import Inventory from "contexts/inventory";
/* eslint-enable */

const Wrapper = props => <Inventory>{inventory => <Notifier {...props} inventory={inventory.data} />}</Inventory>;

class Notifier extends Component {
    checkQuantities = inventory => {
        return inventory.reduce((notifications, item) => {
            const {
                id,
                attributes: { lot_name, name, quantity, par_level }
            } = item;
            const msgBuilder = (name, par_level, quantity) => {
                name = <strong>{name}</strong>;
                par_level = <strong>{par_level}</strong>;
                quantity = <strong>{quantity}</strong>;
                return (
                    <F>
                        <F>Your inventory is low for </F>
                        {name}
                        <F>. Your par level is set to </F>
                        {par_level}
                        <F> lbs but your actual level is </F>
                        {quantity}
                        <F> lbs.</F>
                    </F>
                );
            };
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
