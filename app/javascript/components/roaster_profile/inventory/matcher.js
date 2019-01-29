import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Button, Segment, Form } from "semantic-ui-react";

import Input from "../../shared/input";
import humanize from "../../utilities/humanize";
import underscorer from "../../utilities/underscorer";

class Matcher extends Component {
    constructor(props) {
        super(props);
        let sheetKeys = Object.keys(props.data[0]);
        this.state = {
            details: props.dbKeys.reduce((obj, item, idx) => {
                return { ...obj, [item.name]: sheetKeys[idx] };
            }, {})
        };
    }
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
        this.setState({ details });
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
        return (
            <Container>
                <Segment>
                    <div>
                        <p>
                            Your upload was parsed correctly! Now, we need to map the columns in your sheet to the
                            fields in our database!
                        </p>
                        <div>
                            The fields in our database are:
                            <br />
                            <Form style={{ fontWeight: "bold" }} onSubmit={this.handleSubmit}>
                                {dbKeys.map((item, idx) => {
                                    const options = this.createOptions(Object.keys(data[0]));
                                    return (
                                        <Input
                                            key={item.name}
                                            inputType="select"
                                            label={(
                                                <label style={{ width: 160, textAlign: "right" }}>
                                                    {/* TODO
                                                        Remove the key replacer once we have actual db column names */}
                                                    {humanize(item.name.replace("key_", ""))}
                                                </label>
                                            )}
                                            name={item.name}
                                            onChange={this.handleInputChange}
                                            options={options}
                                            defaultValue={options[idx].value}
                                            inline
                                            fluid={false}
                                        />
                                    );
                                })}
                                <Button content="Import Lots" />
                            </Form>
                        </div>
                    </div>
                </Segment>
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
