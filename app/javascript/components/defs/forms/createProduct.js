const fields = {
    base: [
        { name: "name", label: "Product Name", flex: "100" },
        { name: "description", label: "Product Description", inputType: "markdown", flex: "75" }
    ],
    status: [
        { label: "Draft", value: "draft" },
        { label: "Live", value: "live" },
        { label: "Out of Season", value: "out_of_season" },
        { label: "Coming Soon", value: "coming_soon" }
    ],
    composition: [
        { 
            name: "inventory_item_id", 
            label: "Choose Inventory Item", 
            inputType: "select", 
            flex: "fill", 
            width: "calc(100% - 240px)"
        },
        { name: "pct", label: "Composition %", type: "number", min: 0, max: 100, flex: "auto", width: 100 }
    ],
    variants: [
        { name: "size", label: "Size (in ounces)", placeholder: "oz", step: 0.1, flex: "auto", width: 90 },
        { name: "", label: "", readOnly: true, transparent: true, flex: "auto", width: 60, tabIndex: -1, type: "text" },
        { name: "price_in_dollars", label: "Price", step: 0.01, flex: "auto", width: 185 }
    ],
    hard_goods_variants: [
        { name: "size", label: "Size", flex: "auto", width: 90, type: "text" },
        { name: "price_in_dollars", label: "Price", step: 0.01, flex: "auto", width: 185 }
    ]
};

export default fields;
