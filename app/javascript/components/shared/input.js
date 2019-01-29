import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import underscorer from "../utilities/underscorer";

const Input = props => {
    const {
        label,
        placeholder = label.props ? label.props.children : label,
        name = underscorer(label.props ? label.props.children : label),
        onChange,
        labelPosition = "left",
        autoComplete = "off",
        fluid = true,
        inputType = "input",
        options,
        dataArray,
        ...rest
    } = props;
    return (
        <React.Fragment>
            {inputType === "input" && (
                <Form.Input
                    {...rest}
                    label={label}
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                    labelPosition={labelPosition}
                    autoComplete={autoComplete}
                    fluid={fluid}
                />
            )}

            {inputType === "textarea" && (
                <Form.TextArea {...rest} label={label} placeholder={placeholder} name={name} onChange={onChange} />
            )}

            {inputType === "select" && (
                <Form.Select {...rest} label={label} name={name} onChange={onChange} options={options} fluid={fluid} />
            )}

            {inputType === "checkbox" && <Form.Checkbox {...rest} label={label} name={name} onChange={onChange} />}

            {inputType === "radio" &&
                dataArray.map(item => (
                    <Form.Radio
                        {...rest}
                        key={item.label}
                        label={item.label}
                        name={name}
                        value={item.value}
                        checked={item.checked}
                        onChange={onChange}
                    />
                ))}
        </React.Fragment>
    );
};

const { string, func, bool, array, oneOfType, object } = PropTypes;
Input.propTypes = {
    label: oneOfType([string, object]).isRequired,
    placeholder: string,
    name: string,
    onChange: func,
    labelPosition: string,
    autoComplete: string,
    fluid: bool,
    options: array,
    inputType: string,
    dataArray: array
};

export default Input;
