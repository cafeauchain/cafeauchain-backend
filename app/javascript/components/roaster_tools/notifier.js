import React, { Component } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Messager from "shared/messager";

import Lots from "contexts/lots";
/* eslint-enable */

const Wrapper = props => <Lots>{lots => <Notifier {...props} lots={lots.data} />}</Lots>;

class Notifier extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    checkQuantities = () => {
        const { lots } = this.props;
        return lots.reduce((notifications, lot) => {
            const {
                id,
                attributes: { name, in_warehouse, low_on_hand, low_remaining, on_hand }
            } = lot;
            // TODO Refactor this
            if (low_on_hand && low_on_hand >= on_hand) {
                notifications.push({
                    id: id + "on_hand",
                    // eslint-disable-next-line
                    message: `Your On Hand Inventory is low for ${name}. Your alert level is set to ${low_on_hand} lbs and your actual level is ${on_hand} lbs`,
                    dismissed: false,
                    type: "negative"
                });
            }
            if (low_remaining && low_remaining >= in_warehouse) {
                notifications.push({
                    id: id + "in_warehouse",
                    // eslint-disable-next-line
                    message: `Your Warehouse Inventory is low for ${name}. Your alert level is set to ${low_remaining} lbs and your actual level is ${in_warehouse} lbs`,
                    dismissed: false,
                    type: "negative"
                });
            }
            return notifications;
        }, []);
    };

    render() {
        const notifications = this.checkQuantities();
        if (!notifications.length) return null;
        return <Messager header="Inventory Alerts" messages={notifications} />;
    }
}

const { array } = PropTypes;
Notifier.propTypes = {
    lots: array
};

export default Wrapper;
