import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Message, Header } from "semantic-ui-react";

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
        const { header } = this.props;
        const messageCount = messages.filter(message => !message.dismissed).length;
        if (!messageCount) return null;
        return (
            <Segment>
                {header && <Header as="h2" content={header} />}
                {messages.reduce((msgs, message) => {
                    if (message.dismissed) return msgs;
                    const typeProp = message.type ? { [message.type]: true } : null;
                    return [
                        ...msgs,
                        <Message
                            key={message.id}
                            onDismiss={e => this.handleDismiss(e, message.id)}
                            content={message.message}
                            {...typeProp}
                        />
                    ];
                }, [])}
            </Segment>
        );
    }
}

const { array, string } = PropTypes;
Messager.propTypes = {
    messages: array,
    header: string
};

Messager.defaultProps = {
    messages: [
        { message: "This is a message", dismissed: false, id: 1 },
        { message: "This is another one", dismissed: false, id: 2 }
    ]
};

export default Messager;
