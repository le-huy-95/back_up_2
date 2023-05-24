import './Warehouse_staff.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getDataSearchByEmplyer, updatePickupInProject, getDataSortByWarehouse, updateWarehouseInProject } from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalChatWithCutomer from "./modalChatWithCutomer"
import { toast } from 'react-toastify'
import moment from "moment"
import _, { debounce } from "lodash"

const WarehouseNoStatus = (props) => {
    let history = useHistory()
    const { user } = React.useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false)
    const [ListProjectbyStaffWarehouse, setListProjectbyStaffWarehouse] = useState([])
    const [listProjectbyuserStaff, setListProjectbyuserStaff] = useState([])
    const [listProjectSearch, setListProjectSearch] = useState([])
    const [isSearch, SetIsSearch] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(1)
    const [isLoading, SetIsLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(!showModal)
    }



    const HandleSearchData = debounce(async (value) => {
        let data = value
        if (data) {
            SetIsSearch(true)
            let res = await getDataSearchByEmplyer(data, user.account.Position, +user.account.shippingUnit_Id)
            if (res && +res.EC === 0) {
                let data = res.DT.filter(item => item.statuswarehouseId === 0)

                setListProjectSearch(data)
            }

        } else {
            SetIsSearch(false)
            await fetchProjectUser()

        }

    }, 200)


    const updateWArehouse = async (item) => {
        if (!item.User_Warehouse && !item.Number_Warehouse) {

            let res = await updateWarehouseInProject(item.id, +user.account.shippingUnit_Id, "", user.account.username, user.account.phone, 1, new Date(), "")
            if (res && +res.EC === 0) {
                await fetchProjectUser()
            } else {
                toast.error(res.EM)
            }
        }
    }
    const complete = async (item) => {
        let res = await updateWarehouseInProject(item.id, +user.account.shippingUnit_Id, "", user.account.username, user.account.phone, 2, new Date(), "")
        if (res && +res.EC === 0) {
            await fetchProjectUser()
        } else {
            toast.error(res.EM)
        }
    }

    const fetchProjectUser = async () => {

        let res = await getDataSortByWarehouse(+user.account.shippingUnit_Id, 0)
        if (res && +res.EC === 0) {
            setListProjectbyStaffWarehouse(res.DT)
        }
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
                                    onChange={(event) => HandleSearchData(event.target.value)}


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
                                    <b> nhân viên Kho</b>
                                    <span> Kho hà nội</span>

                                </div>
                                <div className='sort_warehouse my-3'>
                                    <div className='container my-3'>
                                        <div className='row mx-3'>
                                            <div className='col-3 content-warehouse' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Warehouse_staff" style={{ textDecoration: "none", color: "#474141" }}>Tất cả đơn hàng </Link>
                                            </div>
                                            <div className='col-3 my-2 content-warehouse ' style={{ backgroundColor: "#61dafb", cursor: "pointer" }}> Đơn chưa Nhập kho  </div>

                                            <div className='col-3 content-warehouse' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Pick_up_status_one" style={{ textDecoration: "none", color: "#474141" }}> Đơn đã nhập kho </Link>
                                            </div>
                                            <div className='col-3 content-warehouse' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Pick_up_status_two" style={{ textDecoration: "none", color: "#474141" }}> Đơn đã xuất kho </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='table-wrapper-employer-warehouse-One my-5'>
                                    <div className='container'>
                                        <div className='title-employer-warehouse-One my-3'>Tất cả đơn hàng ({ListProjectbyStaffWarehouse.length})</div>
                                        <hr />
                                        <table class="table table-bordered table-body-employer-warehouse-One">
                                            <thead>
                                                <tr >
                                                    <th></th>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Số lượng </th>
                                                    <th scope="col">Trạng thái đơn hàng </th>

                                                    <th scope="col"> Nhân viên xử lý</th>
                                                    <th scope="col">Thao tác</th>


                                                </tr>
                                            </thead>
                                            {ListProjectbyStaffWarehouse && ListProjectbyStaffWarehouse.length > 0
                                                &&
                                                ListProjectbyStaffWarehouse.map((item, index) => {
                                                    return (
                                                        <tbody key={`item-${index}`}>

                                                            <tr>
                                                                {item?.flag === 1 ?
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
                                                                <td>{item.quantity}</td>
                                                                <td>
                                                                    <span style={{ color: "red", fontWeight: "500" }}>  {item?.Status_Warehouse?.status ? item?.Status_Warehouse?.status : "chưa nhập kho"}</span>
                                                                </td>

                                                                <td>
                                                                    {item?.User_Warehouse ? item?.User_Warehouse : "chưa ai nhận đơn"}
                                                                    <br />
                                                                    {item?.Number_Warehouse ? item?.Number_Warehouse : ""}

                                                                </td>
                                                                {item.statuswarehouseId === 0 &&
                                                                    <td>
                                                                        <button className='btn btn-danger mx-3 my-1' onClick={() => updateWArehouse(item)} > Nhận đơn</button>
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

                <ModalChatWithCutomer
                    showModal={showModal}
                    handleShowModal={handleShowModal}
                />
            </div >

        </div >




    )


}

export default WarehouseNoStatus;