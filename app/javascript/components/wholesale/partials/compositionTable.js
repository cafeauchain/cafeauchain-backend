import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Flex from "shared/flex";
/* eslint-enable */

class Composition extends React.Component {
    buildInventoryOptions = inventory =>
        inventory.map(({ id, attributes: { name, lot_name } }) => ({
            value: id,
            text: name + " (" + lot_name + ")",
            key: id,
            id,
            name
        }));

    render(){
        const { composition, fields, inventory, handleChange, btn: RemoveButton } = this.props;
        return (
            <div>    
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
                        <Flex spacing="10" centercross>
                            {fields.map(({ name, label, inputType, flex, width, ...rest }, fieldIdx) => {
                                const showRemoveBtn = fields.length === fieldIdx + 1;
                                return (
                                    <div key={name} flex={flex} style={{ width: width }}>
                                        <Input
                                            key={name}
                                            name={name}
                                            label=""
                                            placeholder={label}
                                            inputType={inputType}
                                            options={!showRemoveBtn ? this.buildInventoryOptions(inventory) : undefined}
                                            data-object="composition"
                                            data-itemid={item.id}
                                            onChange={handleChange}
                                            value={item[name]}
                                            className={!showRemoveBtn ? "selection-no-wrap" : undefined}
                                            {...rest}
                                        />
                                    </div>
                                );
                            })}
                            <div flex="auto">
                                <RemoveButton 
                                    key="btn"
                                    idx={idx}
                                    remover="composition"
                                    disabled={composition.length <= 1}
                                    size="small"
                                />
                            </div>
                        </Flex>
                    </F>
                ))}
            </div>
        );
    }
}

const { array, func } = PropTypes;
Composition.propTypes = {
    composition: array,
    fields: array,
    inventory: array,
    handleChange: func,
    btn: func
};

export default Composition;
