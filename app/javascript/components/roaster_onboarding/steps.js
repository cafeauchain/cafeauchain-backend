const steps = active => [
    {
        key: "profile",
        icon: "user circle",
        title: "Profile",
        active: active === "profile"
    },
    {
        key: "addlots",
        icon: "list",
        title: "Add Lots",
        active: active === "addlots"
    },
    {
        key: "roastprofiles",
        icon: "lab",
        title: "Add Roast Profiles",
        active: active === "roastprofiles"
    },
    {
        key: "wholesale",
        icon: "dollar",
        title: "Wholesale Details",
        active: active === "wholesale"
    }
];

export default steps;
