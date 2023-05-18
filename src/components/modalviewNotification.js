import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalViewNotification = (props) => {
    const { show, handleShowNotificationModal } = props

    return (
        <>
            <Modal show={show} onHide={handleShowNotificationModal} animation={false} size='xl' >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex align-item-center ' style={{ fontSize: "20px" }}>
                        {/* Are you sure to delete product   <b>{dataWarehouseDelete?.product}</b> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShowNotificationModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleShowNotificationModal()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalViewNotification;