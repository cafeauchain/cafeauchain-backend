import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Modal, Header, Button, Dimmer, Icon } from "semantic-ui-react";

/* eslint-disable */
/* eslint-enable */
/* eslint-disable react/no-multi-comp */

class ModalWithTrigger extends PureComponent {
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
    successClose = (msg, cb, data) => {
        this.setState({ success: msg });
        setTimeout(() => {
            this.closeModal();
            return cb ? cb(data) : null;
        }, 900);
    };
    triggerClick = e => {
        e.preventDefault();
        this.setState({ isOpen: true });
    };

    buildInner = iprops => {
        const { component } = this.props;
        return (React.cloneElement(component, {
            ...iprops,
            closeModal: this.closeModal,
            successClose: this.successClose
        }));
    };

    render() {
        let { text, showBtn, isOpen, closeModal, unstyled, btnProps, className = "", ...rest } = this.props;
        const Inner = this.buildInner;
        const { success, isOpen: isOpenState } = this.state;
        if (unstyled) className += " unstyled";
        return (
            <FormattedModal
                {...rest}
                success={success}
                isOpen={text ? isOpenState : isOpen}
                closeModal={this.closeModal}
                successClose={this.successClose}
                trigger={
                    text ? (
                        <Button
                            primary={!unstyled}
                            onClick={this.triggerClick}
                            disabled={!showBtn}
                            content={text}
                            className={className}
                            {...btnProps}
                        />
                    ) : (
                        undefined
                    )
                }
            >
                <Inner />
            </FormattedModal>
        );
    }
}

const { string, node, bool, func, object } = PropTypes;
ModalWithTrigger.propTypes = {
    text: string,
    showBtn: bool,
    closeModal: func,
    isOpen: bool,
    unstyled: bool,
    className: string,
    btnProps: object,
    component: node
};

ModalWithTrigger.defaultProps = {
    showBtn: true
};

// eslint-disable-next-line react/prefer-stateless-function
class FormattedModal extends PureComponent {
    render() {
        const { 
            title, children, size, centered, icon, 
            isOpen, success, closeModal, successClose, ...rest 
        } = this.props;
        return (
            <Modal 
                closeOnDimmerClick={false}
                {...rest}
                closeIcon
                size={size}
                centered={centered}
                open={isOpen}
                onClose={closeModal}
            >
                <Header icon={icon} content={title} />
                <Modal.Content scrolling style={{ minHeight: "30vw" }}>
                    {children}
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

FormattedModal.propTypes = {
    title: string,
    component: node,
    size: string,
    centered: bool,
    icon: string,
    isOpen: bool,
    success: string,
    closeModal: func,
    successClose: func,
    children: node
};
FormattedModal.defaultProps = {
    size: "small",
    centered: false,
    icon: "archive"
};

export default ModalWithTrigger;
