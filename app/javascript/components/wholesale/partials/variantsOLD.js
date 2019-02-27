import React from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
/* eslint-enable */

const Variant = ({ variants, fields, handleChange, btn: RemoveButton }) => (
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
                        data-object="variants"
                        data-itemid={item.id}
                        onChange={handleChange}
                        value={item[name]}
                        {...rest}
                    />
                ))}
                {variants.length > 1 && <RemoveButton idx={idx} remover="variants" />}
            </div>
        ))}
    </Flex>
);

const { array, func } = PropTypes;
Variant.propTypes = {
    variants: array,
    fields: array,
    handleChange: func,
    btn: func
};

export default Variant;
