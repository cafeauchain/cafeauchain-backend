import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Message } from "semantic-ui-react";

class Messager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: props.messages
        };
    }

    handleDismiss = (e, id) => {
        let { messages } = this.state;
        messages = [...messages];
        let message = messages.find(item => item.id === id);
        message.dismissed = true;
        this.setState({ messages });
    };

    render() {
        const { messages } = this.state;
        const messageCount = messages.filter(message => !message.dismissed).length;
        if (!messageCount) return null;
        return (
            <Segment>
                {messages.reduce((msgs, message) => {
                    if (message.dismissed) return msgs;
                    return [
                        ...msgs,
                        <Message
                            key={message.id}
                            onDismiss={e => this.handleDismiss(e, message.id)}
                            content={message.message}
                        />
                    ];
                }, [])}
            </Segment>
        );
    }
}

const { array } = PropTypes;
Messager.propTypes = {
    messages: array
};

Messager.defaultProps = {
    messages: [
        { message: "This is a message", dismissed: false, id: 1 },
        { message: "This is another one", dismissed: false, id: 2 }
    ]
};

export default Messager;
