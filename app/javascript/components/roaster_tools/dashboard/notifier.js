import React, { Component } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Messager from "shared/messager";

import { callMeDanger } from "utilities";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => <Context>{ctx => <Notifier {...props} lots={ctx.lots} getCtxData={ctx.getData} />}</Context>;

class Notifier extends Component {
    componentDidMount() {
        const { lots, getCtxData } = this.props;
        if (lots === undefined) {
            getCtxData("lots");
        }
    }
    checkQuantities = lots => {
        return lots.reduce((notifications, lot) => {
            const {
                id,
                attributes: { name, in_warehouse, low_on_hand, low_remaining, on_hand, on_hand_alert, warehouse_alert }
            } = lot;
            const msgBuilder = (title, name, low_alert, amount) =>
                callMeDanger(`Your ${title} inventory is low for <strong>${name}</strong>.
                 Your par level is <strong>${low_alert}</strong> but
                 your actual level is <strong>${amount}</strong> lbs.`);
            // TODO Refactor this
            if (low_on_hand && low_on_hand >= on_hand && on_hand_alert) {
                notifications.push({
                    id: id + "on_hand",
                    message: msgBuilder("On Hand", name, low_on_hand, on_hand),
                    type: "negative"
                });
            }
            if (low_remaining && low_remaining >= in_warehouse && warehouse_alert) {
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
        let { lots } = this.props;
        if (lots === undefined) lots = [];
        const notifications = this.checkQuantities(lots);
        if (!notifications.length) return null;
        return <Messager header="Inventory Alerts" messages={notifications} />;
    }
}

const { array, func } = PropTypes;
Notifier.propTypes = {
    lots: array,
    getCtxData: func
};

export default Wrapper;
