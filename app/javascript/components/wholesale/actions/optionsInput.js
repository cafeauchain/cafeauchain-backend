import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
/* eslint-enable */

const OptionsInput = ({ item, index, length, onRemove, onChange }) => (
    <React.Fragment>
        <Input 
            action 
            name={item.id}
            label={"Option " + (index + 1)}
            onChange={onChange}
            value={item.value}
            allowLP
        >
            <input data-lpignore="true" />

            <Button
                type="button"
                color="red"
                icon
                content={<Icon name="close" />}
                compact
                idx={index}
                onClick={onRemove}
                disabled={length < 2}
            />
        </Input>
    </React.Fragment>
);

const { object, number, func } = PropTypes;
OptionsInput.propTypes = {
    item: object,
    index: number,
    length: number,
    onRemove: func,
    onChange: func
};

export default OptionsInput;

