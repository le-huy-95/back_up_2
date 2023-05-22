import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from "../../contexApi/UserContext"
import { toast } from 'react-toastify'
import { getProjectWithPaginationWithEmployerDelivery ,getProjectWithPaginationWithEmployerDelivery_user ,updateDeliveryInProject} from "../services/ProjectService"


const ModalCancelReason = (props) => {
    const { user } = React.useContext(UserContext);

    const { showModal, handleShowModal,dataCancel,dataAgain ,action ,fetchProjectUser ,fetchProjectUserWithUsername } = props
    const [input , setInput] = useState("")

    const complete = async(item)=>{
        if(action === "Cancel"){

        let res = await updateDeliveryInProject( dataCancel.id, +user.account.shippingUnit_Id ,3, user.account.username ,user.account.phone, input,"")
        if (res && +res.EC === 0) {
            await fetchProjectUserWithUsername()
            await fetchProjectUser() 
            handleShowModal()               
        }else{
            toast.error(res.EM)
        }
    }
        if(action === "Again"){
            let res = await updateDeliveryInProject(dataAgain.id, +user.account.shippingUnit_Id ,4, user.account.username ,user.account.phone,"", input)
            if (res && +res.EC === 0) {
                await fetchProjectUserWithUsername()
                await fetchProjectUser()
                handleShowModal()               
                
            }else{
                toast.error(res.EM)
            }
    }

    }

    return (
        <>
            <Modal show={showModal} onHide={handleShowModal} animation={false} size='l' >
                <Modal.Header closeButton>
                    <Modal.Title> {action === "Cancel" ? "Lý do giao hàng thất bại" : "Lý do giao lại" }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex align-item-center ' style={{ fontSize: "20px" }}>
                    <input type="text"
                      placeholder={action === "Cancel" ? "Lý do giao hàng thất bại" : "Lý do giao lại" }
                       className='form-control col-12'
                      onChange={(event) => setInput(event.target.value)}
                     value={input}
                   />                   
                   </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShowModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => complete()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalCancelReason;