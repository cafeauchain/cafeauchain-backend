import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Container } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
import Table from "shared/table";

import { Weights } from "shared/textFormatters";
/* eslint-enable */

const Variants = ({ variants, fields, handleChange, btn: RemoveButton }) => (
    <Container style={{ marginBottom: 10 }}>
        <Header as="h3" content="Product Sizes" style={{ marginBottom: 10 }} />
        <Flex spacing="10">
            {fields.map(({ label, flex }) => (
                <div key={label} flex={flex}>
                    <strong>{label}</strong>
                </div>
            ))}
        </Flex>
        {variants.map((item, idx) => (
            <F key={item.id}>
                <Flex spacing="10" centercross>
                    {fields.map(({ name, label, inputType, flex, ...rest }) => {
                        const value = name ? item[name] : Weights({ content: item["size"] });
                        return (
                            <div key={name} flex={flex}>
                                <Input
                                    key={name}
                                    name={name}
                                    label=""
                                    placeholder={label}
                                    type={name ? "number" : "text"}
                                    data-object="variants"
                                    data-itemid={item.id}
                                    onChange={handleChange}
                                    value={value}
                                    {...rest}
                                />
                            </div>
                        );
                    })}
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
