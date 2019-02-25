import React from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
/* eslint-enable */

const Variant = ({ variants, fields, handleChange, onRemove }) => (
    <Flex wrap style={{ margin: "0 -10px" }}>
        {variants.map((item, idx) => (
            <div key={item.id} flex="50" style={{ padding: 10, flexGrow: 0 }}>
                <Header as="h4" content={"Variant " + (idx + 1)} />
                {fields.map(({ name, label, ...rest }) => (
                    <Input
                        key={name}
                        name={name}
                        label={label}
                        type="number"
                        object="variants"
                        index={idx}
                        onChange={handleChange}
                        defaultValue={item[name]}
                        {...rest}
                    />
                ))}
                {variants.length > 1 && (
                    <Button
                        compact
                        size="mini"
                        color="red"
                        content="Remove"
                        type="button"
                        onClick={onRemove}
                        remover="variants"
                        idx={idx}
                    />
                )}
            </div>
        ))}
    </Flex>
);

const { array, func } = PropTypes;
Variant.propTypes = {
    variants: array,
    fields: array,
    handleChange: func,
    onRemove: func
};

export default Variant;
