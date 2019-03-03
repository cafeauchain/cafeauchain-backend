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
        <Header as="h3" content="Product Options" style={{ marginBottom: 10 }} />
        <Flex spacing="10">
            {fields.map(({ label, flex, width }) => (
                <div key={label} flex={flex} style={{ width: width, whiteSpace: "nowrap" }}>
                    <strong>{label}</strong>
                </div>
            ))}
        </Flex>
        {variants.map((item, idx) => (
            <F key={item.id}>
                <Flex spacing="10" centercross>
                    {fields.map(({ name, label, inputType, flex, width, ...rest }, fieldIdx) => {
                        const value = name ? item[name] : Weights({ content: item["size"] });
                        const showRemoveBtn = fields.length === fieldIdx + 1 && variants.length > 1;
                        return (
                            <div key={name} flex={flex} style={{ width: showRemoveBtn ? width + 65 : width }}>
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
                                    action={showRemoveBtn}
                                    {...rest}
                                >
                                    <input />
                                    {showRemoveBtn && <RemoveButton idx={idx} remover="variants" />}
                                </Input>
                            </div>
                        );
                    })}
                </Flex>
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
