import './Delivery_staff.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getProjectWithPaginationWithEmployerDelivery, getProjectWithPaginationWithEmployerDelivery_user, updateDeliveryInProject } from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalCancelReason from "./modal_cancel_reason"
import { toast } from 'react-toastify'

const Delivery_staff = (props) => {
    let history = useHistory()
    const { user } = React.useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(6)
    const [isLoading, SetIsLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [listProjectbyStaffDelivery, setListProjectbyStaffDelivey] = useState([])
    const [listProjectbyuserStaff, setListProjectbyuserStaff] = useState([])
    const [showModal, SetshowModal] = useState(false)
    const [action, setAction] = useState(0)
    const [dataCancel, setDataCancel] = useState([])
    const [dataAgain, setDataAgain] = useState([])

    const handleShowModal = (item) => {
        SetshowModal(!showModal)
        setAction("Cancel")
        setDataCancel(item)
    }
    const handleShowModalAgain = (item) => {
        SetshowModal(!showModal)
        setAction("Again")
        setDataAgain(item)

    }
    const completePickup = async (item) => {
        let res = await updateDeliveryInProject(item.id, +user.account.shippingUnit_Id, 2, user.account.username, user.account.phone, "")
        if (res && +res.EC === 0) {
            await fetchProjectUserWithUsername()
            await fetchProjectUser()
        } else {
            toast.error(res.EM)
        }
    }




    const updateDelivery = async (item) => {

        if (!item.User_Delivery && !item.Number_Delivery) {
            let res = await updateDeliveryInProject(item.id, +user.account.shippingUnit_Id, 1, user.account.username, user.account.phone, "", "")
            if (res && +res.EC === 0) {
                console.log("res", res)
                await fetchProjectUserWithUsername()
                await fetchProjectUser()
            } else {
                toast.error(res.EM)
            }
        }
        if (item.User_Delivery && item.Number_Delivery) {

            let res = await updateDeliveryInProject(item.id, +user.account.shippingUnit_Id, "", "", "", "", "")
            if (res && +res.EC === 0) {
                await fetchProjectUserWithUsername()
                await fetchProjectUser()
            } else {
                toast.error(res.EM)
            }
        }
    }

    const fetchProjectUser = async () => {

        let res = await getProjectWithPaginationWithEmployerDelivery(currentPage, currentLimit, +user.account.shippingUnit_Id)
        if (res && +res.EC === 0) {
            setTotalPage(+res.DT.totalPage)
            if (res.DT.totalPage > 0 && res.DT.dataProject.length === 0) {
                setCurrentPage(+res.DT.totalPage)
                await getProjectWithPaginationWithEmployerDelivery(+res.DT.totalPage, currentLimit, +user.account.shippingUnit_Id)
            }
            if (res.DT.totalPage > 0 && res.DT.dataProject.length > 0) {
                let data = res.DT.dataProject
                if (data) {
                    setListProjectbyStaffDelivey(data)
                }
            }
            if (res.DT.totalPage === 0 && res.DT.dataProject.length === 0) {
                let data = res.DT.dataProject
                setListProjectbyStaffDelivey(data)

            }
        }
    }

    const fetchProjectUserWithUsername = async () => {
        let res = await getProjectWithPaginationWithEmployerDelivery_user(+user.account.shippingUnit_Id, user.account.username, user.account.phone)
        if (res && +res.EC === 0) {
            setListProjectbyuserStaff(res.DT)

        } else {
            toast.error(res.EM)
        }

    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    }

    useEffect(() => {
        fetchProjectUser();
        fetchProjectUserWithUsername()
    }, [currentPage])
    return (
        <div className='employer-Delivery-container '>
            <div className='left-employer-Delivery  '>
                <SidebarStaff collapsed={collapsed} />

            </div>
            <div className='right-employer-Delivery  '>
                <div className='btn-toggle-employer-Delivery'>
                    <span onClick={() => setCollapsed(!collapsed)} className=" d-sm-block ">
                        {collapsed === false ?
                            <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
                            :
                            <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>

                        }
                    </span>
                </div>
                <div className='right-body-employer-Delivery'>
                    <div className='container'>
                        <div className='header-employer-Delivery'>
                            <div className='location-path-employer-Delivery col'>
                                <Link to="/"> Home</Link>

                                <span> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                </span>
                                <Link to="/Delivery_staff">Delivery</Link>
                            </div>
                            <div className='col search-employer-Delivery'>
                                <div className='search-icon-employer-Delivery'>
                                    <i className="fa fa-search" aria-hidden="true"></i>

                                </div>
                                <input
                                    type="text"
                                    placeholder='Search infomation'

                                />
                            </div>
                        </div>
                        <div className='body-employer-Delivery'>
                            <div className="container">
                                <div className='name-page-employer-Delivery'>
                                    <h4> List Delivery </h4>
                                    <div className='more-employer-Delivery'>
                                        <b>Giao hàng tiết kiệm</b>


                                    </div>
                                    <span> nhân viên giao hàng</span>

                                </div>
                                <div className='table-wrapper-employer-Delivery my-5'>
                                    <div className='container'>
                                        <div className='title-employer-Delivery my-3'>Tất cả đơn hàng ({listProjectbyStaffDelivery.length})</div>
                                        <hr />
                                        <div className='sub-title-employer-Delivery'>
                                            <div className='sub-left '>
                                                <div className=' mx-3' style={{ color: "red" }}><i class="fa fa-flag" aria-hidden="true"></i>
                                                </div>
                                                <div className='NameColor'> Đơn gấp</div>

                                            </div>
                                            <div className='sub-title-employer-pickup-right ' >
                                                < ReactPaginate
                                                    nextLabel="next >"
                                                    onPageChange={handlePageClick}
                                                    pageRangeDisplayed={2}
                                                    marginPagesDisplayed={3}
                                                    pageCount={totalPage}
                                                    previousLabel="< previous"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakLabel="..."
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                    renderOnZeroPageCount={null}
                                                    forcePage={+currentPage - 1}

                                                />
                                            </div>

                                        </div>
                                        <table class="table table-bordered table-body-employer-Delivery">
                                            <thead>
                                                <tr className='table-secondary' >
                                                    <th></th>
                                                    <th scope="col">No</th>
                                                    <th scope="col">Id</th>

                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Người nhận </th>
                                                    <th scope="col"> Số ĐT người nhận </th>
                                                    <th scope="col"> Trạng thái đơn hàng </th>

                                                    <th scope="col">Địa chỉ giao hàng </th>
                                                    <th scope="col"> Nhân viên giao hàng</th>
                                                    <th scope="col"> Số tiền phải thu</th>

                                                    <th scope="col">Thao tác</th>


                                                </tr>
                                            </thead>
                                            {listProjectbyStaffDelivery && listProjectbyStaffDelivery.length > 0 &&
                                                listProjectbyStaffDelivery.map((item, index) => {
                                                    return (
                                                        <tbody key={`item-${index}`}>

                                                            <tr >
                                                                {item?.flag === true ?
                                                                    <td>
                                                                        <span style={{ fontSize: "20px", color: "red" }}>
                                                                            <i class="fa fa-flag" aria-hidden="true"></i>
                                                                        </span>
                                                                    </td>
                                                                    :
                                                                    <td></td>

                                                                }
                                                                <td >{(currentPage - 1) * currentLimit + index + 1}</td>

                                                                <td>{item.id}</td>
                                                                <td>{item.order}</td>
                                                                <td> {item?.Warehouse?.product}</td>
                                                                <td> {item?.name_customer}</td>
                                                                <td> {item?.phoneNumber_customer}</td>
                                                                <td>
                                                                    <span style={{ color: "red", fontWeight: "700" }}>
                                                                        {item?.Status_Delivery?.status ? item?.Status_Delivery?.status : "chưa giao hàng"}

                                                                    </span>
                                                                </td>

                                                                <td>{item.addressDetail},{item?.Ward_customer?.name},{item?.District_customer?.name},{item?.Province_customer?.name}  </td>
                                                                <td>
                                                                    {item?.User_Delivery ? item?.User_Delivery : "chưa ai nhận đơn"}
                                                                    <br />
                                                                    {item?.Number_Delivery ? item?.Number_Delivery : ""}

                                                                </td>
                                                                <td>{item.totalWithShippingCost} VNĐ</td>
                                                                {!item.statusDeliveryId
                                                                    &&
                                                                    <td>
                                                                        <button className='btn btn-warning' onClick={() => updateDelivery(item)}> Nhận đơn</button>
                                                                        <br />


                                                                    </td>
                                                                }

                                                            </tr>
                                                        </tbody>
                                                    )
                                                })
                                            }


                                        </table>
                                    </div>


                                </div>
                                <div className='table-wrapper-employer-Delivery-One my-5'>
                                    <div className='container'>
                                        <div className='title-employer-Delivery-One my-3'>Đơn bạn đã nhận ({listProjectbyuserStaff.length})</div>
                                        <hr />
                                        <table class="table table-bordered table-body-employer-Delivery-One">
                                            <thead>
                                                <tr className='table-secondary' >
                                                    <th></th>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Người nhận </th>
                                                    <th scope="col"> Số ĐT người nhận </th>
                                                    <th scope="col"> Trạng thái đơn hàng </th>

                                                    <th scope="col">Địa chỉ giao hàng </th>
                                                    <th scope="col"> Nhân viên giao hàng</th>
                                                    <th scope="col"> Số tiền phải thu</th>

                                                    <th scope="col"> Lý do huỷ hàng</th>
                                                    <th scope="col"> Lý do giao lại</th>

                                                    <th scope="col">Thao tác</th>


                                                </tr>
                                            </thead>
                                            {listProjectbyuserStaff && listProjectbyuserStaff.length > 0
                                                &&
                                                listProjectbyuserStaff.map((item, index) => {
                                                    return (
                                                        <tbody key={`item-${index}`}>

                                                            <tr class="table-primary">

                                                                {item.flag === 1 ?
                                                                    <td>
                                                                        <span style={{ fontSize: "20px", color: "red" }}>
                                                                            <i class="fa fa-flag" aria-hidden="true"></i>
                                                                        </span>
                                                                    </td>
                                                                    :
                                                                    <td></td>

                                                                }
                                                                <td>{item.id}</td>
                                                                <td>{item.order}</td>
                                                                <td> {item?.Warehouse?.product}</td>
                                                                <td> {item?.name_customer}</td>
                                                                <td> {item?.phoneNumber_customer}</td>
                                                                <td>
                                                                    <span style={{ color: "red", fontWeight: "700" }}>
                                                                        {item?.Status_Delivery?.status ? item?.Status_Delivery?.status : "chưa giao hàng"}

                                                                    </span>
                                                                </td>
                                                                <td>{item.addressDetail},{item?.Ward_customer?.name},{item?.District_customer?.name},{item?.Province_customer?.name}  </td>
                                                                <td>
                                                                    {item?.User_Delivery ? item?.User_Delivery : "chưa ai nhận đơn"}
                                                                    <br />
                                                                    {item?.Number_Delivery ? item?.Number_Delivery : ""}

                                                                </td>
                                                                <td>{item.totalWithShippingCost} VNĐ</td>
                                                                <td>{item.Cancel_reason}</td>
                                                                <td>{item.Notice_Delivery}</td>


                                                                {item.statusDeliveryId == 4 &&

                                                                    <td>

                                                                        <div className='d-flex align-item-center justify-content-center flex-column'>
                                                                            <button className='btn btn-success  ' onClick={() => completePickup(item)} >
                                                                                thành công
                                                                            </button>
                                                                            <br />
                                                                            <button className='btn btn-danger  my-1' onClick={() => handleShowModal(item)}>
                                                                                thất bại
                                                                            </button>
                                                                            <br />
                                                                            <button className='btn btn-primary my-1' onClick={() => handleShowModalAgain(item)}>
                                                                                giao lại
                                                                            </button>
                                                                            <br />
                                                                            <button className='btn btn-warning ' onClick={() => updateDelivery(item)} >Hủy </button>

                                                                        </div>
                                                                    </td>
                                                                }


                                                                {item.statusDeliveryId === 1 &&

                                                                    <td>

                                                                        <div className='d-flex align-item-center justify-content-center flex-column'>
                                                                            <button className='btn btn-success  ' onClick={() => completePickup(item)} >
                                                                                thành công
                                                                            </button>
                                                                            <br />
                                                                            <button className='btn btn-danger  my-1' onClick={() => handleShowModal(item)}>
                                                                                thất bại
                                                                            </button>
                                                                            <br />
                                                                            <button className='btn btn-primary my-1' onClick={() => handleShowModalAgain(item)}>
                                                                                giao lại
                                                                            </button>
                                                                            <br />
                                                                            <button className='btn btn-warning ' onClick={() => updateDelivery(item)} >Hủy </button>

                                                                        </div>
                                                                    </td>
                                                                }


                                                                {item.statusDeliveryId === 2 &&
                                                                    <td>
                                                                        <button className='btn btn-info mx-3 '  >Thành công </button>

                                                                    </td>

                                                                }

                                                                {item.statusDeliveryId === 3 &&
                                                                    <td>
                                                                        <button className='btn btn-danger mx-3 ' >Thất bại </button>

                                                                    </td>

                                                                }
                                                            </tr>
                                                        </tbody>
                                                    )
                                                })
                                            }


                                        </table>
                                    </div>


                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <ModalCancelReason
                    showModal={showModal}
                    handleShowModal={handleShowModal}
                    dataCancel={dataCancel}
                    dataAgain={dataAgain}
                    action={action}
                    fetchProjectUser={fetchProjectUser}
                    fetchProjectUserWithUsername={fetchProjectUserWithUsername}
                />
            </div >

        </div >




    )


}

export default Delivery_staff;