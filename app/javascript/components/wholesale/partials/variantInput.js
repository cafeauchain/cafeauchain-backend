import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
import { Weights } from "shared/textFormatters";
/* eslint-enable */

const VariantInput = ({ fields, handleChange, btn: RemoveButton, item, index, length }) => (
    <React.Fragment>
        <Flex spacing="10" centercross>
            {fields.map(({ name, label, inputType, flex, width, type = "number", ...rest }, fieldIdx) => {
                const value = name ? item[name] : Weights({ content: item["size"] });
                const showRemoveBtn = fields.length === fieldIdx + 1;
                return (
                    <div key={name} flex={flex} style={{ width: width }}>
                        <Input
                            key={name}
                            name={name}
                            label=""
                            placeholder={label}
                            type={type}
                            data-object="variants"
                            data-itemid={item.id}
                            onChange={handleChange}
                            value={value}
                            action={showRemoveBtn}
                            allowLP
                            {...rest}
                        >
                            <input />
                            {showRemoveBtn && (
                                <RemoveButton
                                    idx={index}
                                    remover="variants"
                                    disabled={length <= 1}
                                />
                            )}
                        </Input>
                    </div>
                );
            })}
        </Flex>
    </React.Fragment>
);

const { object, number, func, array } = PropTypes;
VariantInput.propTypes = {
    fields: array, 
    handleChange: func, 
    btn: func, 
    item: object,
    index: number, 
    length: number
};

export default VariantInput;