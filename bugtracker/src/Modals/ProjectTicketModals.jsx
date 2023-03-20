import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ProjectTicketModals = (props) => {
    const {showTicket, emitHandleTicketClose, otherTicket} = props;

    return (
        <div>
            <Modal size='lg' show={showTicket} onHide={emitHandleTicketClose}>
                <Modal.Header style={{background:"#282c34", color:"white"}} closeButton>
                    <Modal.Title ><h1>{otherTicket.title}</h1> </Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <h5>Status: {otherTicket.status}</h5>
                    <h5>Priority: {otherTicket.priority}</h5>
                    <h5>Category: {otherTicket.category}</h5>   
                    <p className='mt-5'>Description: {otherTicket.description}</p>
                    {/* <h2 className='text-center mb-5'>{otherTicket.created_on}</h2>  */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={emitHandleTicketClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> 
        </div>
    );
};

export default ProjectTicketModals;