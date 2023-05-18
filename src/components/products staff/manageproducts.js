import './manageproducts.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getProjectWithPagination } from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalChatWithCutomer from "./modalChatWithCutomer"

const Manageproducts = (props) => {
    let history = useHistory()
    const { user } = React.useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false)
    const [listProjectbyUser, setListProjectbyUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(6)
    const [isLoading, SetIsLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(!showModal)
    }
    const fetchProjectUser = async () => {

        let res = await getProjectWithPagination(currentPage, currentLimit, user.account.username)
        if (res && +res.EC === 0) {
            setTotalPage(+res.DT.totalPage)
            if (res.DT.totalPage > 0 && res.DT.dataProject.length === 0) {
                setCurrentPage(+res.DT.totalPage)
                await getProjectWithPagination(+res.DT.totalPage, currentLimit)
            }
            if (res.DT.totalPage > 0 && res.DT.dataProject.length > 0) {
                let data = res.DT.dataProject

                if (data) {
                    console.log("data", data)
                    setListProjectbyUser(data)
                    SetIsLoading(true)
                }
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
        <div className='employer-container '>
            <div className='left-employer  '>
                <SidebarStaff collapsed={collapsed} />

            </div>
            <div className='right-employer  '>
                <div className='btn-toggle-employer'>
                    <span onClick={() => setCollapsed(!collapsed)} className=" d-sm-block ">
                        {collapsed === false ?
                            <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
                            :
                            <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>

                        }
                    </span>
                </div>
                <div className='right-body-employer'>
                    <div className='container'>
                        <div className='header-employer'>
                            <div className='location-path-employer col'>
                                <Link to="/"> Home</Link>

                                <span> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                </span>
                                <Link to="/order-processing">Order-processing </Link>
                            </div>
                            <div className='col search-employer'>
                                <div className='search-icon-employer'>
                                    <i className="fa fa-search" aria-hidden="true"></i>

                                </div>
                                <input
                                    type="text"
                                    placeholder='Search infomation'

                                />
                            </div>
                        </div>
                        <div className='body-employer'>
                            <div className="container">
                                <div className='name-page-employer'>
                                    <h4> Order processing </h4>
                                    <div className='more-employer'>
                                        <b>Giao hàng tiết kiệm</b>


                                    </div>


                                </div>
                                <div className='table-wrapper-employer my-5'>
                                    <div className='container'>
                                        <div className='title-employer my-3'>Đơn xử lý gấp (5)</div>
                                        <hr />
                                        <table class="table table-bordered table-body-employer">
                                            <thead>
                                                <tr >
                                                    <th scope="col">No</th>
                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Số lượng</th>
                                                    <th scope="col">Thời gian tạo</th>
                                                    <th scope="col">Người nhận</th>
                                                    <th scope="col">T/T lấy hàng</th>
                                                    <th scope="col">T/T Nhập kho</th>
                                                    <th scope="col">T/T Giao hàng</th>
                                                    <th scope="col">T/T Thu tiền</th>
                                                    <th scope="col">Người tạo đơn</th>
                                                    <th scope="col">Thao tác</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr class="table-danger">
                                                    <td>1</td>
                                                    <td>abcssasadsa</td>
                                                    <td>bánh mochi</td>
                                                    <td>2</td>
                                                    <td>05-05-2023</td>
                                                    <td>Anh tùng</td>
                                                    <td>Đang lấy hàng</td>
                                                    <td>Chưa nhập kho</td>
                                                    <td>Chưa giao hàng</td>
                                                    <td>Chua thu tiền</td>
                                                    <td>Anh tùng</td>
                                                    <td>
                                                        <span style={{ color: "red", cursor: "pointer" }} title='chuyển trang thái đơn hàng bình thường'>
                                                            <i class="fa fa-toggle-on" aria-hidden="true"></i>

                                                        </span>
                                                        <span className='mx-2' style={{ color: "red", cursor: "pointer" }} title='Nhắn tin với Người tạo đơn' onClick={() => handleShowModal()}>
                                                            <i class="fa fa-comments" aria-hidden="true"></i>

                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                                <div className='table-wrapper-employer-one'>
                                    <div className='container'>
                                        <div className='title-employer-one my-3'>Tất cả đơn hàng(10)</div>
                                        <hr />
                                        <div className='sub'>
                                        < ReactPaginate
                                            nextLabel="next >"
                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={2}
                                            marginPagesDisplayed={3}
                                            pageCount={10}
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
                                       
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">No</th>
                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Số lượng</th>
                                                    <th scope="col">Thời gian tạo</th>
                                                    <th scope="col">Người nhận</th>
                                                    <th scope="col">T/T lấy hàng</th>
                                                    <th scope="col">T/T Nhập kho</th>
                                                    <th scope="col">T/T Giao hàng</th>
                                                    <th scope="col">T/T Thu tiền</th>
                                                    <th scope="col">Người tạo đơn</th>
                                                    <th scope="col">Thao tác</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="table-info">
                                                    <td>1</td>
                                                    <td>abcssasadsa</td>
                                                    <td>bánh mochi</td>
                                                    <td>2</td>
                                                    <td>05-05-2023</td>
                                                    <td>Anh tùng</td>
                                                    <td>Đang lấy hàng</td>
                                                    <td>Chưa nhập kho</td>
                                                    <td>Chưa giao hàng</td>
                                                    <td>Chua thu tiền</td>
                                                    <td>Anh tùng</td>
                                                    <td>
                                                        <span style={{ color: "blue", cursor: "pointer" }} title='chuyển trang thái đơn hàng gấp'>
                                                            <i class="fa fa-toggle-off" aria-hidden="true"></i>

                                                        </span>
                                                        <span className='mx-2' style={{ color: "blue", cursor: "pointer" }} title='Nhắn tin với Người tạo đơn' onClick={() => handleShowModal()}>
                                                            <i class="fa fa-comments" aria-hidden="true"></i>

                                                        </span>
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

export default Manageproducts;