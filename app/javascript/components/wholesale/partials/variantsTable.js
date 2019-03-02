import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Container } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
import Table from "shared/table";
/* eslint-enable */

const Variants = ({ variants, fields, handleChange, btn: RemoveButton }) => (
    <Container style={{ marginBottom: 10 }}>
        <Header as="h3" content="Product Sizes" style={{ marginBottom: 10 }} />
        <Flex spacing="10">
            <div flex="50">
                <strong>Size (in ounces)</strong>
            </div>
            <div flex="50">
                <strong>Price</strong>
            </div>
        </Flex>
        {variants.map((item, idx) => (
            <F key={item.id}>
                <Flex spacing="10">
                    {fields.map(({ name, label, inputType, ...rest }, fieldIdx) => (
                        <div key={name} flex={fieldIdx === 0 ? "50" : "50"}>
                            <Input
                                key={name}
                                name={name}
                                label=""
                                placeholder={label}
                                type="number"
                                data-object="variants"
                                data-itemid={item.id}
                                onChange={handleChange}
                                value={item[name]}
                                {...rest}
                            />
                        </div>
                    ))}
                </Flex>
                {variants.length > 1 && <RemoveButton idx={idx} remover="variants" />}
            </F>
        ))}
    </Container>
);

const { array, func } = PropTypes;
Variants.propTypes = {
    variants: array,
    fields: array,
    handleChange: func,
    btn: func
};

export default Variants;
