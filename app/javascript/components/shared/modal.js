import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Header, Button, Dimmer, Icon } from "semantic-ui-react";

/* eslint-disable */
/* eslint-enable */

class ModalWithTrigger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            success: ""
        };
    }
    closeModal = () => {
        const { closeModal: closeModalProps } = this.props;
        if (closeModalProps) return closeModalProps();
        this.setState({ isOpen: false, success: "" });
    };
    successClose = msg => {
        this.setState({ success: msg });
        setTimeout(this.closeModal, 900);
    };
    triggerClick = e => {
        e.preventDefault();
        this.setState({ isOpen: true });
    };
    render() {
        const { text, showBtn, isOpen, closeModal, ...rest } = this.props;
        const { success, isOpen: isOpenState } = this.state;
        return (
            <FormattedModal
                {...rest}
                success={success}
                isOpen={text ? isOpenState : isOpen}
                closeModal={this.closeModal}
                successClose={this.successClose}
                trigger={
                    text ? <Button primary onClick={this.triggerClick} disabled={!showBtn} content={text} /> : undefined
                }
            />
        );
    }
}

const { string, node, bool, func } = PropTypes;
ModalWithTrigger.propTypes = {
    text: string,
    showBtn: bool,
    closeModal: func,
    isOpen: bool
};

ModalWithTrigger.defaultProps = {
    showBtn: true
};
const FormattedModal = props => {
    const { title, component, size, centered, icon, isOpen, success, closeModal, successClose, ...rest } = props;
    const Inner = iprops => React.cloneElement(component, { ...iprops, closeModal, successClose });
    return (
        <Modal {...rest} closeIcon size={size} centered={centered} open={isOpen} onClose={closeModal}>
            <Header icon={icon} content={title} />
            <Modal.Content scrolling style={{ minHeight: "50vw" }}>
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
};

FormattedModal.propTypes = {
    title: string,
    component: node,
    size: string,
    centered: bool,
    icon: string,
    isOpen: bool,
    success: string,
    closeModal: func,
    successClose: func
};
FormattedModal.defaultProps = {
    size: "small",
    centered: false,
    icon: "archive"
};

export default ModalWithTrigger;
