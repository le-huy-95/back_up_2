import './manageproducts.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getProjectWithPaginationWithEmployer ,getProjectWithPaginationWithEmployerWithFlag ,updateFlagInProject} from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalChatWithCutomer from "./modalChatWithCutomer"
import moment from "moment"
import { toast } from 'react-toastify'
const Manageproducts = (props) => {
    let history = useHistory()
    const { user } = React.useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false)
    const [listProjectbyUnit, setListProjectbyUnit] = useState([])
    const [listProjectbyUnitLenght, setListProjectbyUnitLenghtt] = useState([])

    const [listProjectbyUnitWithFlag, setListProjectbyUnitWithFlag] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(6)
    const [isLoading, SetIsLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [dataChatOne, setDataChatOnet] = useState([])

    const handleShowModal = (item) => {
        setShowModal(!showModal)
        setDataChatOnet(item)
    }


       const updateFlag = async (item) => {
        if(item.flag == 1){
            let res = await updateFlagInProject(item.id,+user.account.shippingUnit_Id ,0)
            if (res && +res.EC === 0) {
                await fetchProjectUserWithFlag()
                await fetchProjectUser()            
               }else{
                toast.error(res.EM)
            }
        }
        if(item.flag == 0){
            let res = await updateFlagInProject(item.id,+user.account.shippingUnit_Id ,1)
            if (res && +res.EC === 0) {
                await fetchProjectUserWithFlag()
                await fetchProjectUser()                
            }else{
                toast.error(res.EM)
            }
        }

    }
    const fetchProjectUserWithFlag = async () => {
        let res = await getProjectWithPaginationWithEmployerWithFlag(+user.account.shippingUnit_Id)
        if (res && +res.EC === 0) {
            setListProjectbyUnitWithFlag(res.DT)
            console.log("res.DT",res.DT)
        }else{
            toast.error(res.EM)
        }

    }

    const fetchProjectUser = async () => {

        let res = await getProjectWithPaginationWithEmployer(currentPage, currentLimit, +user.account.shippingUnit_Id
            )
        if (res && +res.EC === 0) {
            setTotalPage(+res.DT.totalPage)
            if (res.DT.totalPage > 0 && res.DT.dataProject.length === 0) {
                setCurrentPage(+res.DT.totalPage)
                await getProjectWithPaginationWithEmployer(+res.DT.totalPage,currentLimit, +user.account.shippingUnit_Id
                    )
            }
            if (res.DT.totalPage > 0 && res.DT.dataProject.length > 0) {
                let data = res.DT.dataProject

                if (data) {
                    setListProjectbyUnitLenghtt(res.DT.totalProject)
                    setListProjectbyUnit(data)
                    SetIsLoading(true)
                }
            }
            if (res.DT.totalPage === 0 && res.DT.dataProject.length === 0) {
                let data = res.DT.dataProject
                setListProjectbyUnitLenghtt(res.DT.totalProject)

                setListProjectbyUnit(data)
                SetIsLoading(true)

            }
        }
    }
    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    }

    useEffect(() => {
        fetchProjectUser();
    }, [currentPage])
    useEffect(() => {
        fetchProjectUserWithFlag()
    }, [])
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
                                        <div className='title-employer my-3'>Đơn hàng cần xử lý gấp ({listProjectbyUnitWithFlag.length})</div>
                                        <hr />
                                        <table class="table table-bordered table-body-employer">
                                            <thead>
                                                <tr >
                                                    <th scope="col">id</th>

                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Số lượng</th>
                                                    <th scope="col">Thời gian tạo</th>
                                                    <th scope="col">Người nhận</th>
                                                    <th scope="col" style={{width:"150px"}}>T/T lấy hàng</th>
                                                    <th scope="col"  style={{width:"150px"}}>T/T Nhập kho</th>
                                                    <th scope="col" style={{width:"150px"}}>T/T Giao hàng</th>
                                                    <th scope="col" style={{width:"150px"}}>T/T Thanh toán </th>
                                                    <th scope="col">Người tạo đơn</th>
                                                    <th scope="col">Thao tác</th>

                                                </tr>
                                            </thead>
                                         {listProjectbyUnitWithFlag && listProjectbyUnitWithFlag.length> 0 
                                         ?
                                         
                                         listProjectbyUnitWithFlag.map((item,index)=>{
                                            return(
                                                <tbody key={`list-${index}`}>

                                                <tr class="table-danger">
                                                    <td>{item.id}</td>
                                                    <td>{item.order}</td>
                                                    <td>{item?.Warehouse?.product}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                    <td> {item?.name_customer}</td>
                                                    <td>
                                                         {item?.Status_Pickup?.status ? item?.Status_Pickup?.status : "chưa lấy hàng"}
                                                        <br/>
                                                       <b> 
                                                        <span><i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                                        </span> : 
                                                        <br/>
                                                        {item?.User_PickUp ? item?.User_PickUp : "Đang cập nhật"}
                                                        </b> 
                                                        <br/>
                                                        <b> 
                                                        <span><i class="fa fa-phone-square" aria-hidden="true"></i> :
                                                               <br/>
                                                        </span>  {item?.Number_PickUp ? item?.Number_PickUp : "Đang cập nhật"}
                                                        </b> 

                                                        
                                                        </td>
                                                    <td>{item?.Status_Warehouse?.status ? item?.Status_Warehouse?.status : "chưa nhập kho"}</td>
                                                    <td>{item?.Status_Delivery?.status ? item?.Status_Delivery?.status : "chưa giao hàng"}</td>
                                                    <td>{item?.receiveMoneyId?.status ? item?.receiveMoneyId?.status : "chưa thanh toán "}</td>
                                                    <td>{item.createdBy}</td>                                                    <td>
                                                        <span className='mx-2' style={{ color: "red", cursor: "pointer" }} title='chuyển trang thái đơn hàng bình thường' onClick={()=>updateFlag(item)}> 
                                                            <i class="fa fa-toggle-on" aria-hidden="true"></i>

                                                        </span>
                                                        <br/>
                                                        <span className='mx-2' style={{ color: "red", cursor: "pointer" }} title='Nhắn tin với Người tạo đơn' onClick={() => handleShowModal(item)}>
                                                            <i class="fa fa-comments" aria-hidden="true"></i>

                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody> 
                                            )
                                            
                                         }
                                        

                                         )
                                         :
                                         <tr  class="table-danger">
                                                            <td colSpan={14}>
                                                               <div className='d-flex align-item-center justify-content-center'>

                                                               <h5> Không có đơn hàng nào ở trang thái cần xử lý gấp</h5>

                                                               </div>

                                                            </td>

                                                        </tr>
                                        }
                                           
                                        </table>
                                    </div>


                                </div>
                                <div className='table-wrapper-employer-one'>
                                    <div className='container'>
                                        <div className='title-employer-one my-3'>Đơn hàng trạng thái bình thường ({listProjectbyUnitLenght})</div>
                                        <hr />
                                        <div className='sub'>
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
                                       
                                        <table class="table table-bordered">
                                            
                                            <thead>
                                                <tr>

                                                    <th scope="col">No</th>
                                                    <th scope="col">id</th>

                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Số lượng</th>
                                                    <th scope="col">Thời gian tạo</th>
                                                    <th scope="col">Người nhận</th>
                                                    <th scope="col">T/T lấy hàng</th>
                                                    <th scope="col">T/T Nhập kho</th>
                                                    <th scope="col">T/T Giao hàng</th>
                                                    <th scope="col">T/T Thanh toán</th>
                                                    <th scope="col">SĐT người tạo đơn</th>
                                                    <th scope="col">Thao tác</th>


                                                </tr>
                                            </thead>
                                            {listProjectbyUnit && listProjectbyUnit.length > 0 
                                            ?
                                            listProjectbyUnit.map((item ,index)=>{
                                                return(
                                                 
                                                    <tbody key={`item-${index}`}>
                                                     <tr class="table-info">
                                                    
                                                       
                                                    <td >{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>

                                                    <td>{item.order}</td>
                                                    <td> {item?.Warehouse?.product}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                    <td> {item?.name_customer}</td>
                                                    <td>
                                                        {item?.Status_Pickup?.status ? item?.Status_Pickup?.status : "chưa lấy hàng"}
                                                        <br/>
                                                       <b> 
                                                        <span><i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                                        </span> : 
                                                        <br/>
                                                        {item?.User_PickUp ? item?.User_PickUp : "Đang cập nhật"}
                                                        </b> 
                                                        <br/>
                                                        <b> 
                                                        <span><i class="fa fa-phone-square" aria-hidden="true"></i>

                                                        </span> : {item?.Number_PickUp ? item?.Number_PickUp : "Đang cập nhật"}
                                                        </b> 

                                                        
                                                        </td>
                                                    <td>{item?.Status_Warehouse?.status ? item?.Status_Warehouse?.status : "chưa nhập kho"}</td>
                                                    <td>{item?.Status_Delivery?.status ? item?.Status_Delivery?.status : "chưa giao hàng"}</td>
                                                    <td>{item?.receiveMoneyId?.status ? item?.receiveMoneyId?.status : "chưa thanh toán "}</td>
                                                    <td>{item.createdBy}</td>
                                                    <td>
                                                        <span className='mx-2' style={{ color: "blue", cursor: "pointer" }} title='chuyển trang thái đơn hàng gấp' onClick={()=>updateFlag(item)}>
                                                            <i class="fa fa-toggle-off" aria-hidden="true"></i>

                                                        </span>
                                                        <span className='mx-2' style={{ color: "blue", cursor: "pointer" }} title='Nhắn tin với Người tạo đơn' onClick={() => handleShowModal(item)}>
                                                            <i class="fa fa-comments" aria-hidden="true"></i>

                                                        </span>
                                                    </td>
                                                </tr>

                                            </tbody> 
                                                )
                                            })
                                            :
                                            <tr  class="table-info">
                                                <td colSpan={14}>
                                                <div className='d-flex align-item-center justify-content-center'>
   
                                                <h5> Đơn hàng đã trạng thái bình thường đã được xử lý hết hoặc chưa phát sinh đơn hàng mới</h5>
   
                                               </div>
   
                                                </td>
   
                                                </tr>
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
                    dataChatOne={dataChatOne}
                />
            </div >

        </div >




    )


}

export default Manageproducts;