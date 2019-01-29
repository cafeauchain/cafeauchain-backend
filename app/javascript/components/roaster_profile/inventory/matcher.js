import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Button, Form, Header } from "semantic-ui-react";

import Input from "../../shared/input";
import humanize from "../../utilities/humanize";
import underscorer from "../../utilities/underscorer";

class Matcher extends Component {
    constructor(props) {
        super(props);
        const { dbKeys, data } = props;
        const sheetKeys = Object.keys(data[0]);
        const details = dbKeys.reduce((obj, item, idx) => ({ ...obj, [item.name]: sheetKeys[idx] }), {});
        this.state = {
            details,
            disabled: true
        };
    }
    componentDidMount() {
        const { details } = this.state;
        const disabled = !this.hasAnEmpty(details);
        this.setState({ disabled });
    }
    hasAnEmpty = obj => Object.values(obj).every(x => !(x === null || x === "" || x === undefined));
    createOptions = array =>
        array.map(item => {
            const key = underscorer(item);
            return { text: item, value: item, key };
        });
    handleInputChange = (e, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val;
        const disabled = !this.hasAnEmpty(details);
        this.setState({ details, disabled });
    };
    handleSubmit = e => {
        e.preventDefault();
        const { details } = this.state;
        const { data } = this.props;
        const body = data.map(row => {
            let obj = {};
            for (const key in details) {
                obj[key] = row[details[key]];
            }
            return obj;
        });
        // eslint-disable-next-line
        console.log(details, data, body);
    };
    render() {
        const { dbKeys, data } = this.props;
        const { disabled, details } = this.state;
        return (
            <Container text>
                <p>
                    Your import was parsed correctly! Now, we need to map the columns in your import to the fields in
                    our database! Please select the header from the dropdown that aligns with our database field.
                </p>
                <Header as="h4">Our Database Fields:</Header>
                <Form onSubmit={this.handleSubmit}>
                    {dbKeys.map(item => {
                        const options = this.createOptions(Object.keys(data[0]));

                        return (
                            <Input
                                key={item.name}
                                inputType="select"
                                label={(
                                    <label style={{ width: 160, textAlign: "right", fontWeight: "bold" }}>
                                        {/* TODO
                                                Remove the key replacer once we have actual db column names */}
                                        {humanize(item.name.replace("key_", ""))}
                                    </label>
                                )}
                                name={item.name}
                                onChange={this.handleInputChange}
                                options={options}
                                defaultValue={details[item.name]}
                                inline
                                fluid={false}
                                clearable
                                search
                            />
                        );
                    })}
                    <Button content="Import Lots" disabled={disabled} primary />
                </Form>
            </Container>
        );
    }
}

const { array } = PropTypes;
Matcher.propTypes = {
    data: array,
    dbKeys: array
};

export default Matcher;
