import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ProjectTeamModals = (props) => {
    const {show, emitHandleClose, team} = props;
    return (
        <div>
            <Modal size='sm' show={show} onHide={emitHandleClose}>
                <Modal.Header style={{background:"#282c34", color:"white"}} closeButton>
                    <Modal.Title><h1>Employee</h1> </Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <h5 className=''>Name: {team.firstname} {team.lastname}</h5> 
                    <h5 className=''>Employee Id: {team.employeeID}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={emitHandleClose}>Close</Button>
                </Modal.Footer>
                </Modal>
        </div>
    );
};

export default ProjectTeamModals;