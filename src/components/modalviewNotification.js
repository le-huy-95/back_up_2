import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, NavLink, useHistory } from "react-router-dom"
import './modalviewNotification.scss'


const ModalViewNotification = (props) => {
    const { show, handleShowNotificationModal } = props

    return (
        <>
            <Modal show={show} onHide={handleShowNotificationModal} animation={false} size='l' >

                <div className='notification-Container'>
                    <div className='container'>
                        <div className='title mb-3'> Thông báo</div>
                        <div className='button mb-3'>
                            <span className='item-One'>Tất cả</span>
                            <span className='item-Two'>Chưa đọc</span>
                        </div>
                        <div className='content'>
                            <div className='notifiaction_content'>
                                Đơn hàng abc1223456789 vừa chuyển trạng thái giao hàng sang giao hàng nhanh
                            </div>
                        </div>

                    </div>
                </div>

            </Modal >
        </>
    );
}

export default ModalViewNotification;