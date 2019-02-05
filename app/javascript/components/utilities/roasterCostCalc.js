const calculateCost = value => {
    let cost = "$" + (Math.ceil((Number(value) - 500) / 100) * 2 + 19.99).toFixed(2);
    return cost;
};

export default calculateCost;
