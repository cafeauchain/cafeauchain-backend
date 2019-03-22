const steps = active => [
    {
        key: "profile",
        icon: "user circle",
        title: "Profile",
        active: active === "profile"
    },
    {
        key: "payment",
        icon: "dollar",
        title: "Payment Methods",
        active: active === "payment"
    },
    {
        key: "shipping",
        icon: "truck",
        title: "Shipping Preferences",
        active: active === "shipping"
    }
];

export default steps;
