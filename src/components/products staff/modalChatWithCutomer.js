import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalChatWithCutomer = (props) => {
    const { showModal, handleShowModal } = props

    return (
        <>
            <Modal show={showModal} onHide={handleShowModal} animation={false} size='xl' >
                <Modal.Header closeButton>
                    <Modal.Title>Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex align-item-center ' style={{ fontSize: "20px" }}>
                        fgfdgfdg
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleShowModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleShowModal()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalChatWithCutomer;