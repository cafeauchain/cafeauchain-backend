import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Button, Icon, Loader, Dimmer } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";

import Context from "contexts/main";

import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";
/* eslint-enable */

function isEditable(WrappedComponent, onSubmit) {
    class Editable extends Component {
        constructor(props) {
            super(props);
            const {
                item: { name },
                content
            } = props;
            this.state = {
                isEditing: false,
                isLoading: false,
                details: {
                    [name]: content
                },
                errors: []
            };
        }
        resetState = () => {
            const {
                content,
                item: { name }
            } = this.props;
            this.setState({ isEditing: false, isLoading: false, details: { [name]: content }, errors: [] });
        };

        onClick = e => {
            const {
                content,
                item: { name }
            } = this.props;
            e.preventDefault();
            this.setState({ isEditing: true, isLoading: false, details: { [name]: content }, errors: [] });
        };

        handleInputChange = (event, { value, name, checked }) => {
            let { details } = this.state;
            details = { ...details };
            if (name === "") return;
            const val = value || checked;
            details[name] = val;
            this.setState({ details, errors: [] });
        };
        submit = async e => {
            e.preventDefault();
            await this.setState({ isLoading: true });
            const { details } = this.state;
            const {
                item: { id }
            } = this.props;
            const { userId, getData: getCtxData } = this.context;
            const url = ROASTER_URL(userId) + onSubmit.url + id;
            const method = onSubmit.method || "PUT";
            const body = { ...details };
            // eslint-disable-next-line
            // console.log(url, method, body);
            const afterSuccess = async () => {
                await this.resetState();
                const { requests = [] } = onSubmit.onSuccess;
                requests.map(request => getCtxData(request));
            };
            const response = await requester({ url, body, method });
            if (response instanceof Error) {
                const { response: errResponse } = response;
                const errors = errResponse ? errResponse.data : ["Something went wrong"];
                this.setState({ errors, isLoading: false });
            } else {
                if (response.redirect) {
                    window.location.href = await response.redirect_url;
                } else {
                    setTimeout(afterSuccess, 600);
                }
            }
        };

        render() {
            const { editable, item, content, ...rest } = this.props;
            const { isEditing, isLoading, errors } = this.state;
            if (isEditing) {
                return (
                    <F>
                        <Input
                            placeholder="Update..."
                            action
                            label=""
                            name={item.name}
                            type="number"
                            onChange={this.handleInputChange}
                            defaultValue={content}
                            error={errors.length > 0}
                        >
                            <Dimmer active={isLoading} inverted content={<Loader />} />
                            <input />

                            <Button
                                type="button"
                                primary
                                icon
                                content={<Icon name="check" />}
                                compact
                                onClick={this.submit}
                            />
                            <Button
                                type="button"
                                color="red"
                                icon
                                content={<Icon name="close" />}
                                compact
                                tabIndex={-1}
                                onClick={this.resetState}
                            />
                        </Input>
                        {errors.length > 0 && (
                            <ErrorHandler errors={errors} size="mini" style={{ padding: "2px 10px", marginTop: 4 }} />
                        )}
                    </F>
                );
            }
            return <WrappedComponent {...rest} content={content} onClick={this.onClick} />;
        }
    }
    const { node, bool, object } = PropTypes;
    Editable.propTypes = {
        content: node,
        editable: bool,
        item: object
    };
    Editable.contextType = Context;
    return Editable;
}

export default isEditable;
