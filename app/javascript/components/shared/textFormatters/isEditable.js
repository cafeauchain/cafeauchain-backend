import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Button, Icon, Loader, Dimmer } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import Context from "contexts/main";
import urls from "contexts/urls";
/* eslint-enable */

function isEditable(WrappedComponent) {
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
                }
            };
        }
        resetState = () => {
            const {
                content,
                item: { name }
            } = this.props;
            this.setState({ isEditing: false, isLoading: false, details: { [name]: content } });
        };

        onClick = e => {
            const {
                content,
                item: { name }
            } = this.props;
            e.preventDefault();
            this.setState({ isEditing: true, isLoading: false, details: { [name]: content } });
        };

        handleInputChange = (event, { value, name, checked }) => {
            let { details } = this.state;
            details = { ...details };
            if (name === "") return;
            const val = value || checked;
            details[name] = val;
            this.setState({ details });
        };
        submit = async e => {
            e.preventDefault();
            await this.setState({ isLoading: true });
            const { details } = this.state;
            const {
                item: { id }
            } = this.props;
            const { userId, getData: getCtxData } = this.context;
            // TODO This is the only thing that is not dynamic.
            // Perhaps I need to move the entire submit fuction to whereever isEditable is called
            // and/or pass that info
            // Maybe something like onSubmit: {url, method, onSuccess: func(s), onError: func(s) }
            const url = urls(userId)["products"] + "/" + id;
            const method = "PUT";
            const body = { ...details };
            // eslint-disable-next-line
            console.log(url, method, body);

            const afterSuccess = async () => {
                await this.resetState();
                getCtxData("variants");
            };

            setTimeout(afterSuccess, 600);
        };

        render() {
            const { editable, item, content, ...rest } = this.props;
            const { isEditing, isLoading } = this.state;
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
