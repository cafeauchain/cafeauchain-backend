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
        const { item, index, length, onChange, onRemove } = this.props;
        return (
            <React.Fragment>
                <Input
                    action
                    name={item.id}
                    label={"Size " + (index + 1) + " (in ounces)"}
                    onChange={onChange}
                    value={item.value}
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
                        idx={index}
                        onClick={onRemove}
                        disabled={length < 2}
                    />
                </Input>
                {Number(item.value) >= 16 && (
                    <div style={{ margin: "-10px 0 10px" }}>
                        <span>(Weight in lbs: </span>
                        <Weights>{item.value === "" ? Number(0) : item.value}</Weights>
                        <span>)</span>
                    </div>
                )}
            </React.Fragment>
        );
    }
}
const { func, number, object } = PropTypes;
SizeInput.propTypes = {
    item: object,
    onChange: func,
    onRemove: func,
    index: number,
    length: number
};

export default SizeInput;