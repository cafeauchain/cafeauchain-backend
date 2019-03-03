const fields = {
    base: [
        { name: "name", label: "Product Name" },
        { name: "description", label: "Product Description", inputType: "markdown" }
    ],
    composition: [
        { name: "inventory_item_id", label: "Choose Inventory Item", inputType: "select" },
        { name: "pct", label: "Composition %", type: "number", min: 0, max: 100 }
    ],
    variants: [
        { name: "size", label: "Size (in ounces)", placeholder: "oz", step: 0.1, flex: "auto", width: 100 },
        { name: "", label: "", readOnly: true, transparent: true, flex: "auto", width: 60 },
        { name: "price_in_dollars", label: "Price", step: 0.01, flex: "auto", width: 100 }
    ]
};

export default fields;
