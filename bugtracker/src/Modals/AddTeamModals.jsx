import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import requestToPath from '../Services/fetchService';
import { useUser } from '../UserProvider/UserProvider';

const AddTeamModals = (props) => {
    const user = useUser();
    const {projectId, addEmpShow, emitHandleEmployeeClose }= props;
    const [users, setUsers] = useState(null);

    function reload(){reload = window.location.reload()};
   
    function assign(userId){
        requestToPath(`/api/projects/${projectId}/users/${userId}`, "PUT", user.jwt)
        .then((userProjectData) => {
        })        
    }

    function removeUser(userId){
        setUsers(each => each.filter(employee => {
            return employee.id !== userId;
        }))
    }

    useEffect(() => {
        requestToPath(`/api/users/unassigned/${projectId}`, "GET", user.jwt)
        .then((userListd) => {
            setUsers(userListd);
        })
    }, [])
    
    return (
        <div>
            <Modal size='lg' show={addEmpShow} onHide={emitHandleEmployeeClose}>
                <Modal.Header style={{background:"#282c34", color:"white"}}>
                    <Modal.Title><h1>Employee List</h1> </Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                <Table responsive borderless hover size='sm' className='table-condensed' >
                    <thead className='text-center table-dark'>
                            <tr className='row ms-3 me-3'>
                                <th className='col-4 d-block text-truncate' >First</th>
                                <th className='col-4 d-block text-truncate' >Last</th>
                                <th className='col-3 d-block text-truncate' >Employee ID</th>
                                <th className='col-1 d-block '></th>
                            </tr>
                    </thead>
                    <tbody className='d-block ' style={{height:"39vh",  overflow:"auto"}}>
                        {users ? users.map((myUser) => (
                            <tr key={myUser.id} className='row ms-3 me-3'>
                                <td className='col-4 d-block text-truncate'>{myUser.firstname}</td>
                                <td className='col-4 d-block text-truncate'>{myUser.lastname}</td>
                                <td className='col-3 d-block text-truncate'>{myUser.employeeID}</td>
                                <td className='col-1 d-block '>
                                <Button className='m-1' size='sm' onClick={()=>{assign(myUser.id); removeUser(myUser.id);}}>Add</Button>  
                                </td>
                            </tr>
                        )) : (<></>)}
                    </tbody>
                </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{emitHandleEmployeeClose(); reload()}}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>  
        </div>
    );
};

export default AddTeamModals;