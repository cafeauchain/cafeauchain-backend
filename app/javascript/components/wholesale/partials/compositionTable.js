import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Container } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
import Table from "shared/table";
/* eslint-enable */

const Composition = ({ composition, fields, inventoryOptions, handleChange, btn: RemoveButton }) => (
    <Container style={{ marginBottom: 10 }}>
        <Header as="h3" content="Product Composition" style={{ marginBottom: 10 }} />
        <Flex spacing="10">
            <div flex="66">
                <strong>Choose Inventory Item</strong>
            </div>
            <div flex="33">
                <strong>Composition %</strong>
            </div>
        </Flex>
        {composition.map((item, idx) => (
            <F key={item.id}>
                <Flex spacing="10">
                    {fields.map(({ name, label, inputType, ...rest }, fieldIdx) => (
                        <div key={name} flex={fieldIdx === 0 ? "66" : "33"}>
                            <Input
                                key={name}
                                name={name}
                                label=""
                                placeholder={label}
                                inputType={inputType}
                                options={inputType === "select" ? inventoryOptions : null}
                                data-object="composition"
                                data-itemid={item.id}
                                onChange={handleChange}
                                value={item[name]}
                                {...rest}
                            />
                        </div>
                    ))}
                </Flex>
                {composition.length > 1 && <RemoveButton idx={idx} remover="composition" />}
            </F>
        ))}
    </Container>
);

const { array, func } = PropTypes;
Composition.propTypes = {
    composition: array,
    fields: array,
    inventoryOptions: array,
    handleChange: func,
    btn: func
};

export default Composition;
