import React from "react";
/* eslint-disable */
import { Money, AsNumber, PosMoney } from "shared/textFormatters";
/* eslint-enable */

const PosMoneyNoDecimals = props => <PosMoney {...props} decimals={0} />;

const tableDefinition = {
    fields: [
        { name: "name", namespace: "attributes", label: "Lot Name", width: 6 },
        { name: "on_hand", namespace: "attributes", formatter: AsNumber, label: "On Hand" },
        { name: "low_on_hand", namespace: "attributes", formatter: AsNumber, label: "On Hand Par" },
        { 
            name: "on_hand_value", 
            namespace: "attributes", 
            formatter: PosMoneyNoDecimals, 
            textAlign: "right", 
            label: "On Hand Value" 
        },
        { name: "in_warehouse", namespace: "attributes", formatter: AsNumber, label: "Warehouse" },
        { name: "low_remaining", namespace: "attributes", formatter: AsNumber, label: "Warehouse Par" },
        { name: "pounds_of_coffee", namespace: "attributes", formatter: AsNumber, label: "Total Contract" },
        {
            name: "price_per_pound",
            namespace: "attributes",
            formatter: props => Money({ ...props, type: "positive" }),
            label: "$/lb"
        },
        {
            name: "contract_value",
            namespace: "attributes",
            formatter: props => Money({ ...props, type: "positive", decimals: 0 }),
            label: "Total Value"
        }
    ],
    props: {
        celled: true,
        striped: true,
        selectable: true,
        singleLine: true
    }
};

export default tableDefinition;
