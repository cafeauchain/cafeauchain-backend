import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Header, Button, Dimmer, Icon } from "semantic-ui-react";

/* eslint-disable */
/* eslint-enable */

class FormattedModal extends Component {
    state = {
        isOpen: false,
        success: ""
    };

    closeModal = () => this.setState({ isOpen: false });
    successClose = msg => {
        this.setState({ success: msg });
        setTimeout(this.closeModal, 900);
    };

    render() {
        const { text, title, component, size, centered, icon, showBtn, ...rest } = this.props;
        const { isOpen, success } = this.state;
        const Inner = props =>
            React.cloneElement(component, { ...props, closeModal: this.closeModal, successClose: this.successClose });
        return (
            <Modal
                {...rest}
                trigger={(
                    <Button primary onClick={() => this.setState({ isOpen: true })} disabled={!showBtn}>
                        {text}
                    </Button>
                )}
                closeIcon
                size={size}
                centered={centered}
                open={isOpen}
                onClose={this.closeModal}
            >
                <Header icon={icon} content={title} />
                <Modal.Content scrolling>
                    <Inner />
                    {success && (
                        <Dimmer active inverted>
                            <Header as="h2" icon className="primary-text">
                                <Icon name="check" />
                                {success}
                            </Header>
                        </Dimmer>
                    )}
                </Modal.Content>
            </Modal>
        );
    }
}

const { string, node, bool } = PropTypes;
FormattedModal.propTypes = {
    text: string,
    title: string,
    component: node,
    size: string,
    centered: bool,
    icon: string,
    showBtn: bool
};
FormattedModal.defaultProps = {
    size: "small",
    centered: false,
    icon: "archive",
    showBtn: true
};

export default FormattedModal;
