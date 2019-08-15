const fields = [
    { name: "name", label: "Lot Name", flex: "100" },
    { name: "label", label: "Lot Abbreviation (for Roast Log)" },
    { name: "origin", label: "Origin" },
    {
        name: "pounds_of_coffee",
        label: "Pounds Ordered from Producer",
        inputLabel: "lbs",
        type: "number"
    },
    {
        name: "price_per_pound",
        label: "Price per Pound",
        inputLabel: "/lb",
        icon: "dollar",
        type: "number"
    },
    { name: "low_remaining", label: "Warehouse Par Level", inputLabel: "lbs", type: "number" },
    { name: "low_on_hand", label: "On Hand Par Level", inputLabel: "lbs", type: "number" },
    { name: "warehouse_alert", label: "Enable Warehouse Alert?", inputType: "checkbox" },
    { name: "on_hand_alert", label: "Enable On Hand Alert?", inputType: "checkbox" }
];

export default fields;
