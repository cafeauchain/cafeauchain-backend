import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Header, Button } from "semantic-ui-react";

/* eslint-disable */
/* eslint-enable */

class FormattedModal extends Component {
    state = {
        isOpen: false
    };

    closeModal = () => this.setState({ isOpen: false });

    render() {
        const { text, title, component, size, centered, icon, showBtn, ...rest } = this.props;
        const { isOpen } = this.state;
        const Inner = props => React.cloneElement(component, { ...props, closeModal: this.closeModal });
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
                <Modal.Content>
                    <Inner />
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
    size: "mini",
    centered: false,
    icon: "archive"
};

export default FormattedModal;
