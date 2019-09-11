import React from "react";
/* eslint-disable */
import { AsNumber, PosMoney, Enabler } from "shared/textFormatters";
/* eslint-enable */

const NecessaryDecimal = props => <AsNumber {...props} anyDecimals />;

const fields = {
    base: [
        { name: "crop_name" },
        { name: "harvest_year" },
        { name: "name", label: "Lot name" },
        { name: "label", label: "Lot label" },
        { name: "pounds_of_coffee", formatter: NecessaryDecimal, label: "On Contract" },
        { name: "price_per_pound", formatter: PosMoney },
        { name: "contract_value", formatter: PosMoney, label: "Total Value" }
    ],
    roasted: [
        { name: "roasted_on_platform", formatter: NecessaryDecimal, label: "Roasted (on platform)" },
        { name: "roasted_on_import", formatter: NecessaryDecimal, label: "Roasted (at import)" },
        { name: "total_amount_roasted", formatter: NecessaryDecimal },
        { name: "manual_adjustment", formatter: NecessaryDecimal },
        { name: "total_coffee_used", formatter: NecessaryDecimal }
    ],
    warehouse: [
        { name: "in_warehouse", formatter: NecessaryDecimal },
        { name: "warehouse_value", formatter: PosMoney },
        { name: "low_remaining", formatter: AsNumber, label: "Warehouse Par Level" },
        { name: "warehouse_alert", formatter: Enabler },
    ],
    on_hand: [
        { name: "on_hand", formatter: NecessaryDecimal, label: "In House" },
        { name: "on_hand_value", formatter: PosMoney, label: "In House Value" },
        { name: "low_on_hand", formatter: AsNumber, label: "In House Par Level" },
        { name: "on_hand_alert", formatter: Enabler },
    ]
};

export default fields;
