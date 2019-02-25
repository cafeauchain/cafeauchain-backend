import React from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
/* eslint-enable */

const Composition = ({ composition, fields, inventoryOptions, handleChange, onRemove }) => (
    <Flex wrap style={{ margin: "0 -10px" }}>
        {composition.map((item, idx) => (
            <div key={item.id} flex="50" style={{ padding: 10, flexGrow: 0 }}>
                <Header as="h4" content={"Inventory Item " + (idx + 1)} />
                {fields.map(({ name, label, inputType, ...rest }) => (
                    <Input
                        key={name}
                        name={name}
                        label={label}
                        inputType={inputType}
                        options={inputType === "select" ? inventoryOptions : null}
                        object="composition"
                        index={idx}
                        onChange={handleChange}
                        defaultValue={item[name]}
                        {...rest}
                    />
                ))}
                {composition.length > 1 && (
                    <Button
                        compact
                        size="mini"
                        color="red"
                        content="Remove"
                        type="button"
                        onClick={onRemove}
                        remover="composition"
                        idx={idx}
                    />
                )}
            </div>
        ))}
    </Flex>
);

const { array, func } = PropTypes;
Composition.propTypes = {
    composition: array,
    fields: array,
    inventoryOptions: array,
    handleChange: func,
    onRemove: func
};

export default Composition;
