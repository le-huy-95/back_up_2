import './Warehouse_staff.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getProjectWithPaginationWithEmployerWarhouse } from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalChatWithCutomer from "./modalChatWithCutomer"

const Warehouse_staff = (props) => {
    let history = useHistory()
    const { user } = React.useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false)
    const [ListProjectbyStaffWarehouse, setListProjectbyStaffWarehouse] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(6)
    const [isLoading, SetIsLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(!showModal)
    }
    const fetchProjectUser = async () => {

        let res = await getProjectWithPaginationWithEmployerWarhouse(currentPage, currentLimit, +user.account.shippingUnit_Id
            )
        if (res && +res.EC === 0) {
            setTotalPage(+res.DT.totalPage)
            if (res.DT.totalPage > 0 && res.DT.dataProject.length === 0) {
                setCurrentPage(+res.DT.totalPage)
                await getProjectWithPaginationWithEmployerWarhouse(+res.DT.totalPage,currentLimit, +user.account.shippingUnit_Id
                    )
            }
            if (res.DT.totalPage > 0 && res.DT.dataProject.length > 0) {
                let data = res.DT.dataProject
                console.log("data",data)

                if (data) {
                    setListProjectbyStaffWarehouse(data)
                }
            }
            if (res.DT.totalPage === 0 && res.DT.dataProject.length === 0) {
                let data = res.DT.dataProject
                setListProjectbyStaffWarehouse(data)

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
        <div className='employer-warehouse-container '>
            <div className='left-employer-warehouse  '>
                <SidebarStaff collapsed={collapsed} />

            </div>
            <div className='right-employer-warehouse  '>
                <div className='btn-toggle-employer-warehouse'>
                    <span onClick={() => setCollapsed(!collapsed)} className=" d-sm-block ">
                        {collapsed === false ?
                            <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
                            :
                            <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>

                        }
                    </span>
                </div>
                <div className='right-body-employer-warehouse'>
                    <div className='container'>
                        <div className='header-employer-warehouse'>
                            <div className='location-path-employer-warehouse col'>
                                <Link to="/"> Home</Link>

                                <span> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                </span>
                                <Link to="/Warehouse_staff">Warehouse</Link>
                            </div>
                            <div className='col search-employer-warehouse'>
                                <div className='search-icon-employer-warehouse'>
                                    <i className="fa fa-search" aria-hidden="true"></i>

                                </div>
                                <input
                                    type="text"
                                    placeholder='Search infomation'

                                />
                            </div>
                        </div>
                        <div className='body-employer-warehouse'>
                            <div className="container">
                                <div className='name-page-employer-warehouse'>
                                    <h4> List Warehouse </h4>
                                    <div className='more-employer-warehouse'>
                                       <b>Giao hàng tiết kiệm</b> 


                                    </div>
                                    <span> nhân viên Kho</span>
                                    <span> Kho 123</span>

                                </div>
                                <div className='table-wrapper-employer-warehouse my-5'>
                                    <div className='container'>
                                        <div className='title-employer-warehouse my-3'>Tất cả đơn hàng (5)</div>
                                        <hr />
                                        <div className='sub-title-employer-warehouse'>
                                      
                                            <div className='sub-left '>
                                                <div className=' mx-3' style={{color:"red"}}><i class="fa fa-flag" aria-hidden="true"></i>
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
                                           

                                        <table class="table table-bordered table-body-employer-warehouse">
                                            <thead>
                                                <tr >
                                                    <th></th>
                                                    <th scope="col">No</th>
                                                    <th scope="col">Id</th>

                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Số lượng </th>
                                                    <th scope="col"> Trạng thái đơn hàng</th>

                                                    <th scope="col"> Nhân viên xử lý</th>
                                                    <th scope="col">Thao tác</th>


                                                </tr>
                                            </thead>
                                            {ListProjectbyStaffWarehouse &&  ListProjectbyStaffWarehouse.length>0
                                                     &&
                                            
                                            ListProjectbyStaffWarehouse.map((item,index)=>{
                                                return(
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
                                                        <td>{item.quantity}</td>
                                                        <td>{item.statuswarehouseId ? item.statuswarehouseId : "chưa nhập kho"}</td>
    
 <td> 
                                                          {item?.User_Warehouse ?  item?.User_Warehouse : "chưa ai nhận đơn"}
                                                                 <br/>
                                                                {item?.Number_Warehouse ?  item?.Number_Warehouse : ""}

                                                    </td>    
                                                        <td>
                                                            <button className='btn btn-danger'> Nhận đơn</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                    )
                                            })}
                                           
                                           
                                        </table>
                                    </div>


                                </div>
                                <div className='table-wrapper-employer-warehouse-One my-5'>
                                    <div className='container'>
                                        <div className='title-employer-warehouse-One my-3'>Đơn bạn đã nhận (5)</div>
                                        <hr />
                                        <table class="table table-bordered table-body-employer-warehouse-One">
                                        <thead>
                                                <tr >
                                                    <th scope="col">No</th>
                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Số lượng </th>
                                                    <th scope="col"> Trạng thái đơn hàng</th>
                                                    <th scope="col"> Tình trạng hàng hoá</th>

                                                    <th scope="col"> Nhân viên xử lý</th>
                                                    <th scope="col">Thao tác</th>


                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr class="table-primary">
                                                <td>1</td>
                                                    <td>abcssasadsa</td>
                                                    <td>bánh mochi</td>
                                                    <td>2</td>
                                                    <td>Chưa nhập kho</td>
                                                    <td>Tốt </td>

                                                    <td>Anh tùng</td>

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
                                                    <td>Chưa nhập kho</td>
                                                    <td>Tốt </td>

                                                    <td>Anh tùng</td>

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

export default Warehouse_staff;