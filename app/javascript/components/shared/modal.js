import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Header, Button } from "semantic-ui-react";

/* eslint-disable */
/* eslint-enable */

class FormattedModal extends Component {
    state = {
        isOpen: false
    };
    render() {
        const { text, title, component, size, centered, icon, refreshParent, ...rest } = this.props;
        const { isOpen } = this.state;
        const refreshAndClose = () => {
            this.setState({ isOpen: false }, refreshParent);
        };
        const Inner = props => React.cloneElement(component, { ...props, refreshAndClose });
        return (
            <Modal
                {...rest}
                trigger={(
                    <Button primary onClick={() => this.setState({ isOpen: true })}>
                        {text}
                    </Button>
                )}
                closeIcon
                size={size}
                centered={centered}
                open={isOpen}
                onClose={() => this.setState({ isOpen: false })}
            >
                <Header icon={icon} content={title} />
                <Modal.Content>
                    <Inner />
                </Modal.Content>
            </Modal>
        );
    }
}

const { string, func, node, bool } = PropTypes;
FormattedModal.propTypes = {
    refreshParent: func,
    text: string,
    title: string,
    component: node,
    size: string,
    centered: bool,
    icon: string
};
FormattedModal.defaultProps = {
    size: "mini",
    centered: false,
    icon: "archive"
};

export default FormattedModal;
