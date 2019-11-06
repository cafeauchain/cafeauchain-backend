import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

/* eslint-disable */
/* eslint-enable */

const ProductType = ({ updateType, type, isUpdate }) => {
    const onClick = (e, extra) => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        if (isUpdate) return null;
        updateType(null, { name: 'product_type', value: extra['data-type']});
    };
    const roasted = type === "roasted";
    const hard_goods = type === "hard_goods";
    return (
        <>
            <strong>Product Type</strong>
            <br />
            <Button.Group>
                <Button
                    content="Roasted Coffee"
                    onClick={onClick}
                    data-type="roasted"
                    primary={roasted}
                    disabled={hard_goods ? isUpdate : false}
                />
                <Button
                    content="Hard Goods (including cold brew)"
                    onClick={onClick}
                    data-type="hard_goods"
                    primary={hard_goods}
                    disabled={roasted ? isUpdate : false}
                />
            </Button.Group>
            <br />
            <br />
        </>
        
    );
};

const { func, string, bool } = PropTypes;
ProductType.propTypes = {
    updateType: func,
    type: string,
    isUpdate: bool
};

export default ProductType;
