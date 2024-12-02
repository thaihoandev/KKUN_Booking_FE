import React from "react";
import Modal from "react-bootstrap/Modal"; // or use any modal library

const ConfirmDialog = ({ show, onConfirm, onCancel, message }) => {
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Action</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <button variant="secondary" onClick={onCancel}>
                    Cancel
                </button>
                <button variant="primary" onClick={onConfirm}>
                    Yes
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDialog;
