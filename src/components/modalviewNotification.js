import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, NavLink, useHistory } from "react-router-dom"
import './modalviewNotification.scss'
import { getAllNotificaltion } from "./services/ProjectService"
import { UserContext } from "../contexApi/UserContext"
import moment from "moment"


const ModalViewNotification = (props) => {
    const { show, handleShowNotificationModal } = props
    const { user } = React.useContext(UserContext);
    const [list, setList] = useState([])

    const getALlListNotification = async () => {
        let res = await getAllNotificaltion(+user.account.shippingUnit_Id, user.account.phone)
        if (res && +res.EC === 0) {
            let data = res.DT.filter(item => item.CreatedBy === user.account.phone)
            setList(data)
        }
    }
    useEffect(() => {
        getALlListNotification()
    }, [show])

    return (
        <>
            <Modal show={show} onHide={handleShowNotificationModal} animation={false} size='lg' >

                <div className='notification-Container'>
                    <div className='container'>
                        <div className='title mb-3'> Thông báo</div>
                        <div className='button mb-3'>
                            <span className='item-One'>Tất cả</span>
                            <span className='item-Two'>Chưa đọc</span>
                        </div>
                        <div className='content'>
                            {list && list.length > 0 &&
                                list.map((item, index) => {
                                    return (
                                        <>
                                            <div className='notifiaction_content '>

                                                <span className='mx-3'> Đơn hàng</span>  <b>{item.Order}</b> {item.Change_content === "thêm mới" && `mới được tạo `}
                                                <br />
                                                <span className='time'>
                                                    {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                </span>
                                            </div>
                                            <hr />
                                        </>

                                    )
                                })
                            }


                        </div>

                    </div>
                </div>

            </Modal >
        </>
    );
}

export default ModalViewNotification;