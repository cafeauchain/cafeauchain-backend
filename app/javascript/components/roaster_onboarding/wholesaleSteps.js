const steps = active => [
    {
        key: "bank",
        icon: "dollar",
        title: "Bank Info",
        active: active === "bank"
    },
    {
        key: "shipping",
        icon: "truck",
        title: "Shipping",
        active: active === "shipping"
    },
    {
        key: "products",
        icon: "coffee",
        title: "Products",
        active: active === "products"
    }
];

export default steps;
