// TODO can 'on_hand' and 'roasted' be defaulted to 0? or removed? or in some way opted in?
// Since the only time they should be used is when onboarding
// Possibly a prop to omit/hide/defualt to 0 when added from quick actions?

const fields = [
    { name: "name", label: "Lot Name" },
    { name: "label", label: "Lot Abbreviation (for Roast Log)" },
    {
        name: "lot_size",
        label: "Pounds Ordered from Producer",
        inputLabel: "lbs"
    },
    {
        name: "price_per_pound",
        label: "Price per Pound",
        inputLabel: "/lb",
        icon: "dollar"
    },
    { name: "on_hand", label: "Pounds on Hand", inputLabel: "lbs", defaultValue: 0, hidden: true },
    {
        name: "roasted",
        label: "Pounds Roasted (green weight)",
        inputLabel: "lbs",
        defaultValue: 0,
        hidden: true
    }
];

export default fields;
