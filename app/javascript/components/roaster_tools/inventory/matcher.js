import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Button, Form, Header } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";

import humanize from "utilities/humanize";
import underscorer from "utilities/underscorer";
import readCookie from "utilities/readCookie";
import API_URL from "utilities/apiUtils/url";

import Lots from "contexts/lots";
/* eslint-enable */

const Wrapper = props => (
    <Lots>{lots => <Matcher {...props} id={lots.userId} updateContext={lots.updateContext} />}</Lots>
);

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
    startSubmit = e => {
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
        this.handleSubmit(body);
    };

    handleSubmit = async lots => {
        const { id } = this.props;
        const url = `${API_URL}/roasters/${id}/lots/upload_lot_csv`;
        const cookie = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": cookie
            },
            body: JSON.stringify({ lots, roaster_profile_id: id })
        });
        let respJSON = await response.json();
        if (response.ok) {
            window.location.href = await respJSON.redirect_url;
        } else {
            if (respJSON.redirect) {
                window.location.href = await respJSON.redirect_url;
            } else {
                this.getLotData(id);
            }
        }
    };

    // only called after successful submit
    getLotData = async id => {
        const url = `${API_URL}/roasters/${id}/lots`;
        const { updateContext } = this.props;
        const response = await fetch(url);
        const { data } = await response.json();
        if (data instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", data.response);
        } else {
            // TODO Add success/error messaging before closing
            updateContext({ lots: data });
        }
    };
    render() {
        const { dbKeys, data } = this.props;
        const { disabled, details } = this.state;
        return (
            <Container>
                <p>
                    Your import was parsed correctly! Now, we need to map the columns in your import to the fields in
                    our database! Please select the header from the dropdown that aligns with our database field.
                </p>
                <Header as="h4">Our Database Fields:</Header>
                <Form onSubmit={this.startSubmit}>
                    {dbKeys.map(item => {
                        const options = this.createOptions(Object.keys(data[0]));

                        return (
                            <Input
                                key={item.name}
                                inputType="select"
                                label={(
                                    <label
                                        style={
                                            {
                                                /* width: 160, textAlign: "right", fontWeight: "bold" */
                                            }
                                        }
                                    >
                                        {humanize(item.name.replace("key_", ""))}
                                    </label>
                                )}
                                name={item.name}
                                onChange={this.handleInputChange}
                                options={options}
                                defaultValue={details[item.name]}
                                inline={false}
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

const { array, string, oneOfType, number, func } = PropTypes;
Matcher.propTypes = {
    data: array,
    dbKeys: array,
    id: oneOfType([string, number]),
    updateContext: func
};

export default Wrapper;
