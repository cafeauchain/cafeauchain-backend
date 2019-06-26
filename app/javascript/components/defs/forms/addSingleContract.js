const fields = [
    { name: "name", label: "Lot Name" },
    { name: "label", label: "Lot Abbreviation (for Roast Log)" },
    {
        name: "lot_size",
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
    { name: "low_on_hand", label: "On Hand Par Level", inputLabel: "lbs", type: "number" },
    { name: "low_remaining", label: "Warehouse Par Level", inputLabel: "lbs", type: "number" },
    { name: "on_hand", label: "Pounds on Hand", inputLabel: "lbs", hidden: true, type: "number" },
    { name: "roasted", label: "Pounds Roasted (green weight)", inputLabel: "lbs", hidden: true, type: "number" }
];

export default fields;
