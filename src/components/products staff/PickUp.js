import './PickUp.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getProjectWithPagination } from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalChatWithCutomer from "./modalChatWithCutomer"

const Pickup = (props) => {
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
        <div className='employer-pickup-container '>
            <div className='left-employer-pickup  '>
                <SidebarStaff collapsed={collapsed} />

            </div>
            <div className='right-employer-pickup  '>
                <div className='btn-toggle-employer-pickup'>
                    <span onClick={() => setCollapsed(!collapsed)} className=" d-sm-block ">
                        {collapsed === false ?
                            <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
                            :
                            <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>

                        }
                    </span>
                </div>
                <div className='right-body-employer-pickup'>
                    <div className='container'>
                        <div className='header-employer-pickup'>
                            <div className='location-path-employer-pickup col'>
                                <Link to="/"> Home</Link>

                                <span> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                </span>
                                <Link to="/Pickup_staff">Pick up</Link>
                            </div>
                            <div className='col search-employer-pickup'>
                                <div className='search-icon-employer-pickup'>
                                    <i className="fa fa-search" aria-hidden="true"></i>

                                </div>
                                <input
                                    type="text"
                                    placeholder='Search infomation'

                                />
                            </div>
                        </div>
                        <div className='body-employer-pickup'>
                            <div className="container">
                                <div className='name-page-employer-pickup'>
                                    <h4> List Pick-up </h4>
                                    <div className='more-employer-pickup'>
                                       <b>Giao hàng tiết kiệm</b> 


                                    </div>
                                    <span> nhân viên lấy hàng</span>
                                </div>
                                <div className='table-wrapper-employer-pickup my-5'>
                                    <div className='container'>
                                        <div className='title-employer-pickup my-3'>Tất cả đơn hàng (5)</div>
                                        <hr />
                                        <div className='sub-title-employer-pickup'>
                                            <div className='sub-left '>
                                                <div className='color mx-3'></div>
                                                <div className='NameColor'> Đơn gấp</div>

                                            </div>
                                            <div className='sub-title-employer-pickup-right ' >
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
                                        <table class="table table-bordered table-body-employer-pickup">
                                            <thead>
                                                <tr >
                                                    <th scope="col">No</th>
                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Số lượng </th>
                                                    <th scope="col">Thời gian tạo</th>
                                                    <th scope="col" style={{ width: "200px" }}>Địa chỉ lấy hàng</th>
                                                    <th scope="col">Người nhận đơn</th>

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
                                                    <td> Chưa ai nhận</td>

                                                    <td>
                                                        <button className='btn btn-danger'> Nhận đơn</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tbody>

                                                <tr class="table-danger">
                                                    <td>1</td>
                                                    <td>abcssasadsa</td>
                                                    <td>bánh mochi</td>
                                                    <td>2</td>
                                                    <td>05-05-2023</td>
                                                    <td>Anh tùng</td>
                                                    <td> Chưa ai nhận</td>
                                                    <td>
                                                        <button className='btn btn-danger'> Nhận đơn</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                                <div className='table-wrapper-employer-pickup-One my-5'>
                                    <div className='container'>
                                        <div className='title-employer-pickup-One my-3'>Đơn bạn đã nhận (5)</div>
                                        <hr />
                                        <table class="table table-bordered table-body-employer-pickup-One">
                                            <thead>
                                                <tr >
                                                    <th scope="col">No</th>
                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Số lượng </th>
                                                    <th scope="col">Thời gian tạo</th>
                                                    <th scope="col" style={{ width: "250px" }}>Địa chỉ lấy hàng</th>
                                                    <th scope="col">Người nhận đơn</th>
                                                    <th scope="col"> Phương tiện lấy hàng</th>

                                                    <th scope="col">Thao tác</th>


                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr class="table-primary">
                                                    <td>1</td>
                                                    <td>abcssasadsa</td>
                                                    <td>bánh mochi</td>
                                                    <td>2</td>
                                                    <td>05-05-2023</td>
                                                    <td>Anh tùng</td>
                                                    <td>Huy</td>
                                                    <td>Ô tô</td>

                                                    <td>
                                                        <button className='btn btn-success mx-3 my-1'> Hoàn thành</button>
                                                        <br/>
                                                        <button className='btn btn-warning mx-3 my-1'>Hủy nhận đơn</button>

                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tbody>

                                                <tr class="table-primary">
                                                    <td>1</td>
                                                    <td>abcssasadsa</td>
                                                    <td>bánh mochi</td>
                                                    <td>2</td>
                                                    <td>05-05-2023</td>
                                                    <td>Anh tùng</td>
                                                    <td>Anh tùng</td>
                                                    <td>Ô tô</td>

                                                    <td>
                                                        <button className='btn btn-success mx-3 my-1'> Hoàn thành</button>
                                                        <br/>

                                                        <button className='btn btn-warning mx-3 my-1'>Hủy nhận đơn</button>

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

export default Pickup;