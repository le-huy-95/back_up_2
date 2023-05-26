import './overview.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getProjectWithPaginationWithEmployerOverview } from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalChatWithCutomer from "./modalChatWithCutomer"

const Overview = (props) => {
    let history = useHistory()
    const { user } = React.useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false)
    const [listProjectbyStaffOverview, setListProjectbyStaffOverview] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(6)
    const [isLoading, SetIsLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(!showModal)
    }
    const fetchProjectUser = async () => {

        let res = await getProjectWithPaginationWithEmployerOverview(currentPage, currentLimit, +user.account.shippingUnit_Id)
        if (res && +res.EC === 0) {
            setTotalPage(+res.DT.totalPage)
            if (res.DT.totalPage > 0 && res.DT.dataProject.length === 0) {
                setCurrentPage(+res.DT.totalPage)
                await getProjectWithPaginationWithEmployerOverview(+res.DT.totalPage, currentLimit, +user.account.shippingUnit_Id)
            }
            if (res.DT.totalPage > 0 && res.DT.dataProject.length > 0) {
                let data = res.DT.dataProject
                console.log("data", data)
                if (data) {
                    setListProjectbyStaffOverview(data)
                    SetIsLoading(true)
                }
            }
            if (res.DT.totalPage === 0 && res.DT.dataProject.length === 0) {
                let data = res.DT.dataProject
                setListProjectbyStaffOverview(data)

            }
        }
    }
    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    }

    useEffect(() => {
        fetchProjectUser();
    }, [currentPage])
    return (
        <div className='overview-container '>
            <div className='left-overview  '>
                <SidebarStaff collapsed={collapsed} />

            </div>
            <div className='right-overview  '>
                <div className='btn-toggle-overview'>
                    <span onClick={() => setCollapsed(!collapsed)} className=" d-sm-block ">
                        {collapsed === false ?
                            <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
                            :
                            <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>

                        }
                    </span>
                </div>
                <div className='right-body-overview'>
                    <div className='container'>
                        <div className='header-overview'>
                            <div className='location-path-overview col'>
                                <Link to="/"> Home</Link>

                                <span> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                </span>
                                <Link to="/Overview">Delivery</Link>
                            </div>
                            <div className='col search-overview'>
                                <div className='search-icon-overview'>
                                    <i className="fa fa-search" aria-hidden="true"></i>

                                </div>
                                <input
                                    type="text"
                                    placeholder='Search infomation'

                                />
                            </div>
                        </div>
                        <div className='body-overview'>
                            <div className="container">
                                <div className='name-page-overview'>
                                    <h4> OverView </h4>
                                    <div className='more-overview'>
                                        <b>Giao hàng tiết kiệm</b>


                                    </div>
                                    <span> nhân viên kế toán</span>

                                </div>
                                <div className='sort_Overview my-3'>
                                    <div className='container my-3'>
                                        <div className='row mx-3'>
                                            <div className='col-3 my-2 content-Overview ' style={{ backgroundColor: "#61dafb", cursor: "pointer" }}> Tất cả đơn  </div>
                                            <div className='col-3 content-Overview' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Pick_up_no_status" style={{ textDecoration: "none", color: "#474141" }}>Đơn chưa lấy hàng </Link>
                                            </div>
                                            <div className='col-3 content-Overview' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Pick_up_status_one" style={{ textDecoration: "none", color: "#474141" }}> Đơn đang lấy hàng </Link>
                                            </div>
                                            <div className='col-3 content-Overview' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Pick_up_status_two" style={{ textDecoration: "none", color: "#474141" }}> Đơn đã lấy hàng </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='table-wrapper-overview my-5'>
                                    <div className='container'>
                                        <div className='title-overview my-3'>Tất cả đơn hàng (5)</div>
                                        <hr />
                                        <div className='sub-title-overview'>

                                            <div className='sub-title-overview-right ' >
                                                < ReactPaginate
                                                    nextLabel="next >"
                                                    onPageChange={handlePageClick}
                                                    pageRangeDisplayed={2}
                                                    marginPagesDisplayed={3}
                                                    pageCount={1}
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
                                        <table class="table table-bordered table-body-overview">
                                            <thead>
                                                <tr >
                                                    <th scope="col">No</th>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Thông tin người tạo </th>
                                                    <th scope="col">T/T giao hàng</th>
                                                    <th scope="col">Lý do hủy hàng</th>
                                                    <th scope="col">T/T tk ngân hàng </th>
                                                    <th scope="col">Tổng tiền thu hộ </th>
                                                    <th scope="col">Phụ phí</th>
                                                    <th scope="col">Thao tác</th>


                                                </tr>
                                            </thead>
                                            {listProjectbyStaffOverview && listProjectbyStaffOverview.length > 0 &&
                                                listProjectbyStaffOverview.map((item, index) => {
                                                    return (
                                                        <tbody key={`item-${index}`}>

                                                            <tr class="table-success">
                                                                <td >{(currentPage - 1) * currentLimit + index + 1}</td>
                                                                <td>{item.id}</td>
                                                                <td>{item.order}</td>
                                                                <td>
                                                                    <span>
                                                                        {item.createdByName}
                                                                    </span>
                                                                    <br />
                                                                    <span>
                                                                        {item.createdBy}

                                                                    </span>
                                                                </td>
                                                                <td>{item?.Status_Delivery?.status ? item?.Status_Delivery?.status : ""} </td>
                                                                <td>{item?.Cancel_reason ? item?.Cancel_reason : ""}</td>
                                                                <td>
                                                                    <span>
                                                                        {item?.Bank_name ? item?.Bank_name : ""}
                                                                    </span>
                                                                    <br />
                                                                    <span>
                                                                        {item?.Account_number ? item?.Account_number : ""}
                                                                    </span>
                                                                </td>
                                                                <td>{item.totalWithShippingCost}</td>
                                                                <td>{item.Sub_money}</td>

                                                                <td>
                                                                    <button className='btn btn-danger'> Thanh toán</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                })
                                            }


                                        </table>
                                    </div>


                                </div>
                                <div className='table-wrapper-overview-One my-5'>
                                    <div className='container'>
                                        <div className='title-overview-One my-3'>đơn hàng đã thanh toán (5)</div>
                                        <hr />

                                        <table class="table table-bordered table-body-overview">
                                            <thead>
                                                <tr >
                                                    <th scope="col">No</th>
                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col"> Người tạo đơn</th>
                                                    <th scope="col">Số điện thoại người tạo đơn</th>
                                                    <th scope="col">Số tiền thu hộ khách</th>
                                                    <th scope="col">Phụ phí</th>
                                                    <th scope="col">tài khoản ngân hàng</th>
                                                    <th scope="col">Thao tác</th>


                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr class="table-success">
                                                    <td>1</td>
                                                    <td>abcssasadsa</td>
                                                    <td>bánh mochi</td>
                                                    <td>anh tùng </td>
                                                    <td>Hà nội</td>
                                                    <td>0789321456  </td>
                                                    <td>Anh Tú</td>

                                                    <td>
                                                        <button className='btn btn-danger'> Thanh toán</button>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>


                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <ModalChatWithCutomer
                    showModal={showModal}
                    handleShowModal={handleShowModal}
                />
            </div >

        </div >




    )


}

export default Overview;