import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Header } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import { humanize, underscorer } from "utilities"
import { requester, roasterUrl } from "utilities/apiUtils";

import withContext from "contexts/withContext";
/* eslint-enable */

class Matcher extends Component {
    constructor(props) {
        super(props);
        const { dbKeys, data } = props;
        const sheetKeys = Object.keys(data[0]);
        const details = dbKeys.reduce((obj, item, idx) => ({ ...obj, [item.name]: sheetKeys[idx] }), {});
        this.state = {
            details,
            disabled: true,
            errors: [],
            btnLoading: false,
            positiveMessage: false
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
        details[name] = val || "";
        const disabled = !this.hasAnEmpty(details);
        this.setState({ details, disabled });
    };
    startSubmit = async e => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        await this.setState({ btnLoading: true });
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
        const { userId } = this.props;
        const url = `${roasterUrl(userId)}/lots/upload_lot_csv`;
        const response = await requester({ url, body: { lots, roaster_profile_id: userId }});
        this.afterSubmit(response);
    };
    
    afterSubmit = response => {
        const { updateContext, resetParent } = this.props;
        setTimeout( async () => {
            await this.setState({ btnLoading: false });
            if (response instanceof Error) {
                this.setState({ errors: [response.response.data] });
            } else {
                if (response.redirect) {
                    window.location = await response.redirect_url;
                } else {
                    updateContext({ lots: response.data });
                    await this.setState({ errors: ["Lots Imported!"], positiveMessage: true });
                    setTimeout(resetParent, 800);
                }
            }
        }, 400);
    }

    render() {
        const { dbKeys, data } = this.props;
        const { disabled, details, errors, positiveMessage, btnLoading } = this.state;
        const options = this.createOptions(Object.keys(data[0]));
        return (
            <div>
                <p>
                    Your import was parsed correctly! Now, we need to map the columns in your import to the fields in
                    our database! Please select the header from the dropdown that aligns with our database field.
                </p>
                <Header as="h4" content="Our Database Fields:" />
                <Form>
                    {dbKeys.map(item => {
                        return (
                            <Input
                                key={item.name}
                                inputType="select"
                                label={humanize(item.name.replace("key_", ""))}
                                name={item.name}
                                onChange={this.handleInputChange}
                                options={options}
                                defaultValue={details[item.name]}
                                clearable
                                search
                            />
                        );
                    })}
                    <ErrorHandler errors={errors} negative={!positiveMessage} positive={positiveMessage} />
                    <Button content="Import Lots" disabled={disabled} primary loading={btnLoading} onClick={this.startSubmit} />
                </Form>
            </div>
        );
    }
}

const { array, string, oneOfType, number, func } = PropTypes;
Matcher.propTypes = {
    data: array,
    dbKeys: array,
    userId: oneOfType([string, number]),
    updateContext: func,
    resetParent: func
};

export default withContext(Matcher);
