import React from "react";
import { Button, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

/* eslint-disable */
import Input from "shared/input";
import { Weights } from "shared/textFormatters";
/* eslint-enable */

class SizeInput extends React.Component {
    state = {}
    render(){
        const { name, label, onChange, value, onRemove, idx, disabled } = this.props;
        return (
            <React.Fragment>
                <Input
                    action
                    name={name}
                    label={label}
                    onChange={onChange}
                    value={value}
                    type="number"
                    allowLP
                >
                    <input data-lpignore="true" />

                    <Button
                        type="button"
                        color="red"
                        icon
                        content={<Icon name="close" />}
                        compact
                        idx={idx}
                        onClick={onRemove}
                        disabled={disabled}
                    />
                </Input>
                {Number(value) >= 16 && (
                    <div style={{ margin: "-10px 0 10px" }}>
                        <span>(Weight in lbs: </span>
                        <Weights>{value === "" ? Number(0) : value}</Weights>
                        <span>)</span>
                    </div>
                )}
            </React.Fragment>
        );
    }
}
const { func, string, number, bool, oneOfType } = PropTypes;
SizeInput.propTypes = {
    name: string,
    label: string,
    onChange: func,
    value: oneOfType([number, string]),
    onRemove: func,
    disabled: bool,
    idx: number
};

export default SizeInput;