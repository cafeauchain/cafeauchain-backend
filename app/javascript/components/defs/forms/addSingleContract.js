// TODO can 'on_hand' and 'roasted' be defaulted to 0? or removed? or in some way opted in?
// Since the only time they should be used is when onboarding
// Possibly a prop to omit/hide/defualt to 0 when added from quick actions?

const fields = [
    { name: "lot_size", label: "lbs", placeholder: "Pounds ordered from producer" },
    { name: "on_hand", label: "lbs", placeholder: "Pounds on hand" },
    { name: "roasted", label: "lbs", placeholder: "Pounds roasted (green weight)" },
    { name: "price_per_pound", label: "/lb", placeholder: "Price per pound", icon: "dollar" }
];

export default fields;
