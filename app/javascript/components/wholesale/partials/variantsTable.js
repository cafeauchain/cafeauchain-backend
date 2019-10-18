import React from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import DraggableList from "shared/draggableList";
import VariantInput from "wholesale/partials/variantInput"
/* eslint-enable */


const Variants = ({ variants, fields, handleChange, btn, handleReorder }) => {
    const handleVariantReorder = (variants) => handleReorder( variants, "variants" );
    return (
        <div style={{ marginBottom: 10 }}>
            <Header as="h3" content="Product Sizes" style={{ marginBottom: 10 }} />
            <Flex spacing="10" spacebetween>
                {fields.map(({ label, flex, width }, idx) => {
                    const size = idx === 0;
                    const styles = { width: width, whiteSpace: "nowrap", marginLeft: size ? 44 : null };
                    return (
                        <div key={label} flex={flex} style={styles}>
                            <strong>{label}</strong>
                        </div>
                    );
                })}
            </Flex>
            <DraggableList
                updateOrder={handleVariantReorder}
                items={variants}
                passedProps={{ fields, handleChange, btn }}
                component={VariantInput}
            />
        </div>
    );
};

const { array, func, string } = PropTypes;
Variants.propTypes = {
    variants: array,
    fields: array,
    handleChange: func,
    btn: func,
    handleReorder: func
};

export default Variants;
