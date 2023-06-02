import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, NavLink, useHistory } from "react-router-dom"
import './modalviewNotification.scss'
import { getAllNotificaltion } from "./services/ProjectService"
import { UserContext } from "../contexApi/UserContext"
import moment from "moment"


const ModalViewNotification = (props) => {
    let history = useHistory()

    const { show, handleShowNotificationModal } = props
    const { user } = React.useContext(UserContext);
    const [list, setList] = useState([])

    const getALlListNotification = async () => {
        let res = await getAllNotificaltion(+user.account.shippingUnit_Id, user.account.phone)
        if (res && +res.EC === 0) {
            if (!user.account.shippingUnit_Id) {

                let data = res.DT.filter(item => item.CreatedBy === user.account.phone && item.Change_content !== "thêm mới")
                setList(data)
            }
            if (user.account.shippingUnit_Id) {
                setList(res.DT)
            }

        }
    }
    const handleViewProduct = (item) => {
        history.push(`/detailProduct/${item.ProjectId}`)
        handleShowNotificationModal()
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
                            <div className='container'>
                                {list && list.length > 0
                                    ?
                                    list.map((item, index) => {
                                        return (
                                            <>
                                                <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>

                                                    {user?.account?.groupWithRound?.name === "Customer" && item.Change_content === "đơn hàng đang lấy hàng" &&
                                                        <>
                                                            <div onClick={() => handleViewProduct(item)}>

                                                                <span className='mx-3'> Đang đi lấy đơn hàng <b>{item.Order}</b></span>
                                                                <br />
                                                                <span className='time'>
                                                                    {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                </span>
                                                            </div>
                                                            <hr />
                                                        </>

                                                    }
                                                    {user?.account?.groupWithRound?.name === "Customer" && item.Change_content === "đơn hàng đã lấy thành công" &&
                                                        <>

                                                            <div onClick={() => handleViewProduct(item)}>
                                                                <span className='mx-3'> Đã lấy đơn hàng <b>{item.Order}</b> thành công</span>
                                                                <br />
                                                                <span className='time'>
                                                                    {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                </span>
                                                            </div>
                                                            <hr />

                                                        </>

                                                    }
                                                    {user?.account?.groupWithRound?.name === "Customer" && item.Change_content === "đơn hàng trì hoãn" &&
                                                        <>

                                                            <div onClick={() => handleViewProduct(item)}>
                                                                <span className='mx-3'> Delay lấy hàng đơn hàng <b>{item.Order}</b> </span>
                                                                <br />
                                                                <span className='time'>
                                                                    {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                </span>
                                                            </div>
                                                            <hr />

                                                        </>

                                                    }
                                                    {user?.account?.groupWithRound?.name === "Staff" && item.Change_content === "thay đổi thông tin đơn hàng" &&
                                                        <>
                                                            <div>
                                                                <span className='mx-3' >Đơn hàng </span>  <b>{item.Order}</b> đã cập nhật thông tin đơn hàng
                                                                <br />
                                                                <span className='time'>
                                                                    {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                </span>
                                                            </div>
                                                            <hr />

                                                        </>
                                                    }
                                                    {user?.account?.groupWithRound?.name === "Staff" && item.Change_content === "thêm mới" &&
                                                        <>
                                                            <div>
                                                                <span className='mx-3'> Đơn hàng</span>  <b>{item.Order}</b> {item.Change_content === "thêm mới" && `mới được tạo `}
                                                                <br />
                                                                <span className='time'>
                                                                    {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                </span>
                                                            </div>
                                                            <hr />

                                                        </>
                                                    }
                                                    {user?.account?.groupWithRound?.name === "Staff" && item.Change_content === "thay đổi thông tin  người nhận" &&
                                                        <>
                                                            <div>
                                                                <span className='mx-3'> Đơn hàng</span>  <b>{item.Order}</b> đã cập nhật thông tin người nhận
                                                                <br />
                                                                <span className='time'>
                                                                    {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                </span>
                                                            </div>
                                                            <hr />

                                                        </>
                                                    }
                                                    {user?.account?.groupWithRound?.name === "Staff" && item.Change_content === "thay đổi địa chỉ  người nhận" &&
                                                        <>
                                                            <div>
                                                                <span className='mx-3'> Đơn hàng</span>  <b>{item.Order}</b> đã cập nhật thông tin địa chỉ giao hàng
                                                                <br />
                                                                <span className='time'>
                                                                    {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                </span>
                                                            </div>
                                                            <hr />

                                                        </>
                                                    }
                                                    {user?.account?.groupWithRound?.name === "Staff" && item.Change_content === "thay đổi địa chỉ người bán" &&
                                                        <>
                                                            <div>
                                                                <span className='mx-3'> Đơn hàng</span>  <b>{item.Order}</b> đã cập nhật thông tin địa chỉ lấy hàng
                                                                <br />
                                                                <span className='time'>
                                                                    {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                </span>
                                                            </div>
                                                            <hr />

                                                        </>
                                                    }
                                                    {user?.account?.groupWithRound?.name === "Staff" && item.Change_content === "người tạo vừa chat" &&
                                                        <>
                                                            <div>
                                                                <span className='mx-3'> Đơn hàng</span>  <b>{item.Order}</b> vừa có tin nhắn mới
                                                                <br />
                                                                <span className='time'>
                                                                    {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                </span>
                                                            </div>
                                                            <hr />

                                                        </>
                                                    }


                                                </div>
                                            </>

                                        )
                                    })
                                    :
                                    <div className='Not-Found'>  chưa có thông báo nào</div>
                                }


                            </div>
                        </div>

                    </div>
                </div >

            </Modal >
        </>
    );
}

export default ModalViewNotification;