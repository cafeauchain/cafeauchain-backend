import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Message, Header } from "semantic-ui-react";

class Messager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dismissed: []
        };
    }

    handleDismiss = (e, id) => {
        const { dismissed } = this.state;
        dismissed.push(id);
        this.setState({ dismissed });
    };

    checkForMessages = (messages = [], dismissed) => {
        return messages.filter(msg => dismissed.indexOf(msg.id) < 0);
    };

    render() {
        const { header, messages } = this.props;
        const { dismissed } = this.state;
        const validMessages = this.checkForMessages(messages, dismissed);
        if (!validMessages.length) return null;
        return (
            <Segment>
                {header && <Header as="h2" content={header} />}
                {validMessages.reduce((msgs, message) => {
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

// Messager.defaultProps = {
//     messages: [
//         { message: "This is a message", dismissed: false, id: 1 },
//         { message: "This is another one", dismissed: false, id: 2 }
//     ]
// };

export default Messager;
