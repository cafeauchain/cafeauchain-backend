import React from "react";
import PropTypes from "prop-types";
import { Header, Modal } from "semantic-ui-react";

/* eslint-disable */
import CreateProduct from "wholesale/actions/createProduct";
/* eslint-enable */

const EditProductModal = ({ isOpen, item, closeModal }) => (
    <Modal open={isOpen} onClose={closeModal} size="tiny">
        <Header as="h3" content={"Update " + item.attributes.title} />
        <Modal.Content>
            <CreateProduct item={item} />
        </Modal.Content>
    </Modal>
);

const { bool, object, func } = PropTypes;
EditProductModal.propTypes = {
    isOpen: bool,
    item: object,
    closeModal: func
};

export default EditProductModal;
