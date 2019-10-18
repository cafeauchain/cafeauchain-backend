import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

/* eslint-disable */
/* eslint-enable */

const ProductType = ({ updateType, type }) => {
    const onClick = (e, extra) => {
        e.preventDefault();
        const { target } = e;
        target.blur();
        updateType(null, { name: 'product_type', value: extra['data-type']});
    };
    const roasted = type === "roasted";
    const hard_goods = type === "hard_goods";
    return (
        <>
            <Button.Group>
                <Button content="Roasted Coffee" onClick={onClick} data-type="roasted" primary={roasted} />
                <Button
                    content="Hard Goods (including cold brew)"
                    onClick={onClick}
                    data-type="hard_goods"
                    primary={hard_goods}
                />
            </Button.Group>
            <br />
            <br />
        </>
        
    );
};

const { func, string } = PropTypes;
ProductType.propTypes = {
    updateType: func,
    type: string
};

export default ProductType;
