const fields = {
    base: [
        { name: "name", label: "Product Name" },
        { name: "description", label: "Product Description", inputType: "textarea" }
    ],
    composition: [
        { name: "inventory_item_id", label: "Choose Inventory Item", inputType: "select" },
        { name: "pct", label: "Composition %", type: "number", min: 0, max: 100 }
    ],
    variants: [
        { name: "size", label: "Size (in ounces)", step: 0.1 },
        { name: "price_in_cents", label: "Price", step: 0.01 }
    ]
};

export default fields;