import './overview.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getProjectWithPagination } from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalChatWithCutomer from "./modalChatWithCutomer"

const Overview = (props) => {
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

                                        </div>
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