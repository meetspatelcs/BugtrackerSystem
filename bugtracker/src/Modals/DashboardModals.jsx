import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DashboardModals = (props) => {
    const {show, emitHandleClose, selectedProject} = props;
    return (
        <div>
            <Modal size='sm' show={show} onHide={emitHandleClose}>
                <Modal.Header style={{background:"#282c34", color:"white"}} closeButton>
                    <Modal.Title><h1>{selectedProject.selectedTitle}</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <h5 className='mb-5'>Project Id: {selectedProject.selectedId}</h5> 
                    <p className='mt-5'>Description: {selectedProject.selectedProjectDesc}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={emitHandleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    );
};

export default DashboardModals;
