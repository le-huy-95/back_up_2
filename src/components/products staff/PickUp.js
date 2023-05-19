import './PickUp.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getProjectWithPaginationWithEmployerPickUp ,getProjectWithPaginationWithEmployerPickUp_user ,updatePickupInProject} from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalChatWithCutomer from "./modalChatWithCutomer"
import moment from "moment"
import { toast } from 'react-toastify'

const Pickup = (props) => {
    let history = useHistory()
    const { user } = React.useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false)
    const [listProjectbyStaffPickup, setListProjectbyStaffPickup] = useState([])
    const [listProjectbyuserStaff, setListProjectbyuserStaff] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(6)
    const [isLoading, SetIsLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(!showModal)
    }

    const updatePickup = async (item) => {
        if(!item.User_PickUp && !item.Number_PickUp){
            let res = await updatePickupInProject(item.id,+user.account.shippingUnit_Id ,user.account.username ,user.account.phone ,1)
            if (res && +res.EC === 0) {
                await fetchProjectUserWithUsername()
                await fetchProjectUser()            
               }else{
                toast.error(res.EM)
            }
        }
        if(item.User_PickUp && item.Number_PickUp){   
        let res = await updatePickupInProject(item.id,+user.account.shippingUnit_Id ,null , null,null)
            if (res && +res.EC === 0) {
                await fetchProjectUserWithUsername()
                await fetchProjectUser()                
            }else{
                toast.error(res.EM)
            }
        }

    }
       const completePickup = async(item)=>{
        let res = await updatePickupInProject(item.id,+user.account.shippingUnit_Id ,user.account.username ,user.account.phone ,2)
        if (res && +res.EC === 0) {
            await fetchProjectUserWithUsername()
            await fetchProjectUser()                
        }else{
            toast.error(res.EM)
        }
    }
            

    const fetchProjectUserWithUsername = async () => {
        let res = await getProjectWithPaginationWithEmployerPickUp_user(+user.account.shippingUnit_Id , user.account.username , user.account.phone)
        if (res && +res.EC === 0) {
            setListProjectbyuserStaff(res.DT)
            console.log("res.DT",res.DT)
        }else{
            toast.error(res.EM)
        }

    }

    const fetchProjectUser = async () => {

        let res = await getProjectWithPaginationWithEmployerPickUp(currentPage, currentLimit, +user.account.shippingUnit_Id
            )
        if (res && +res.EC === 0) {
            setTotalPage(+res.DT.totalPage)
            if (res.DT.totalPage > 0 && res.DT.dataProject.length === 0) {
                setCurrentPage(+res.DT.totalPage)
                await getProjectWithPaginationWithEmployerPickUp(+res.DT.totalPage,currentLimit, +user.account.shippingUnit_Id
                    )
            }
            if (res.DT.totalPage > 0 && res.DT.dataProject.length > 0) {
                let data = res.DT.dataProject

                if (data) {
                    setListProjectbyStaffPickup(data)
                    SetIsLoading(true)
                }
            }
            if (res.DT.totalPage === 0 && res.DT.dataProject.length === 0) {
                let data = res.DT.dataProject

                setListProjectbyStaffPickup(data)
                SetIsLoading(true)

            }
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
                                        <div className='title-employer-pickup my-3'>Tất cả đơn hàng ({listProjectbyStaffPickup.length})</div>
                                        <hr />
                                        <div className='sub-title-employer-pickup'>
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
                                        <table class="table table-bordered table-body-employer-pickup">
                                            <thead>
                                                <tr >
                                                <th scope="col"></th>

                                                    <th scope="col">No</th>
                                                    <th scope="col">Id</th>

                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Số lượng </th>
                                                    <th scope="col">Thời gian tạo</th>
                                                    <th scope="col" style={{ width: "200px" }}>Địa chỉ lấy hàng</th>
                                                    <th scope="col">Người nhận đơn</th>

                                                    <th scope="col">Thao tác</th>


                                                </tr>
                                            </thead>
                                            {listProjectbyStaffPickup && listProjectbyStaffPickup.length>0 
                                            ?
                                
                                            listProjectbyStaffPickup.map((item,index)=>{
                                               return(
                                                <tbody>

                                                <tr class="table-warning">
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
                                                    <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                    <td>{item?.addressDetail},{item?.Ward_customer.name},{item?.District_customer.name},{item?.Province_customer.name}</td>
                                                    <td> 
                                                        {item?.User_PickUp ?  item?.User_PickUp : "chưa ai nhận đơn"}
                                                                 <br/>
                                                                {item?.Number_PickUp ?  item?.Number_PickUp : ""}

                                                    </td>
                                                    <td>
                                                    { !item?.User_PickUp    &&

                                                        <button className='btn btn-danger' onClick={()=>updatePickup(item)}> Nhận đơn</button>
                                                        
                                                    }
                                                     { item?.statuspickupId === 2  &&

                                                  <button className='btn btn-danger'> Đã hoàn thành</button>

                                                  }
                                               
                                                    </td>
                                                </tr>
                                            </tbody>
                                               )
                                              })
                                              :
                                              
                                              <tr  class="table-info">
                                                  <td colSpan={14}>
                                                  <div className='d-flex align-item-center justify-content-center'>
     
                                                  <h5> Đơn hàng đã được xử lý toàn bộ</h5>
     
                                                 </div>
     
                                                  </td>
     
                                                  </tr>
                                              }
                                             
                                           
                                           
                                        </table>
                                    </div>


                                </div>
                                <div className='table-wrapper-employer-pickup-One my-5'>
                                    <div className='container'>
                                        <div className='title-employer-pickup-One my-3'>Đơn bạn đã nhận ({listProjectbyuserStaff.length})</div>
                                        <hr />
                                        <table class="table table-bordered table-body-employer-pickup-One">
                                            <thead>
                                                <tr >
                                                    <th scope="col">Id</th>

                                                    <th scope="col">Mã đơn</th>
                                                    <th scope="col">Mặt hàng</th>
                                                    <th scope="col">Số lượng </th>
                                                    <th scope="col">Thời gian tạo</th>
                                                    <th scope="col" style={{ width: "250px" }}>Địa chỉ lấy hàng</th>
                                                    <th scope="col">Người nhận đơn</th>
                                                    <th scope="col"> Số điện thoại người nhận</th>

                                                    <th scope="col">Thao tác</th>


                                                </tr>
                                            </thead>
                                            {listProjectbyuserStaff && listProjectbyuserStaff.length>0
                                             ?

                                            listProjectbyuserStaff.map((item,index)=>{
                                                return(
                                                    <tbody key={`item-${index}`}>

                                                    <tr class="table-primary">
                                                        <td>{item.id}</td>
                                                        <td>{item.order}</td>
                                                        <td> {item?.Warehouse?.product}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                        <td>{item?.addressDetail},{item?.Ward_customer.name},{item?.District_customer.name},{item?.Province_customer.name}</td>
                                                        <td> {item?.User_PickUp ?  item?.User_PickUp : "chưa ai nhận đơn"}</td>
                                                        <td> {item?.Number_PickUp ?  item?.Number_PickUp : "0"}</td>
    {item?.statuspickupId === 1  ?
    
    <td>
    <button className='btn btn-info mx-3 my-1' onClick={()=>completePickup(item)}> Hoàn thành</button>
    <br/>
    <button className='btn btn-warning mx-3 my-1' onClick={()=>updatePickup(item)}>Hủy nhận đơn</button>

</td>
:
<td>
<button className='btn btn-success mx-3 my-1' > Đã hoàn thành</button>

</td>
}
                                                    </tr>
                                                </tbody>
                                                )
                                            })
                                            :
                                              
                                            <tr  class="table-info">
                                                <td colSpan={14}>
                                                <div className='d-flex align-item-center justify-content-center'>
   
                                                <h5> Bạn chưa nhận đơn hàng nào</h5>
   
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
                />
            </div >

        </div >




    )


}

export default Pickup;