import React, { useEffect, useRef, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import requestToPath from '../Services/fetchService';
import jwt_decode from "jwt-decode";
import { useUser } from '../UserProvider/UserProvider';

const ProjectTeamTable = (props) => {
    const user = useUser();
    const{projectId, emitHandleShow, emitHandleTeam} = props;
    const[employees, setEmployees] = useState([]); // was null before []
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        requestToPath(`/api/projects/${projectId}/users`, "GET", user.jwt)
        .then((projectTeam) => {
            setEmployees(projectTeam);
        });
    },[]);

    useEffect(() => {
        setRoles(getRolesFromJWT());
      }, [user.jwt]);

    function getRolesFromJWT(){
    if(user.jwt){      
        const decodedJwt = jwt_decode(user.jwt);
        //authorities
        return decodedJwt.authorities;
    }
    return [];
    }

    function removeFromTeam(userId){
        requestToPath(`/api/projects/${projectId}/users/${userId}`, "DELETE", user.jwt)
        .then((msg) => {
            const teamsCopy = [...employees];
            const i = teamsCopy.findIndex((emp) => emp.id === userId);
            teamsCopy.splice(i, 1);
            setEmployees(teamsCopy);
        });
    }
    
    return (
        <div>
            <Table responsive borderless hover size='sm' className='table-condensed' >
                <thead className='table-dark'>
                        <tr className='row ms-3 me-1'>
                            <th className='col-4 d-block text-truncate'>First</th>
                            <th className='col-4 d-block text-truncate'>Last</th>
                            <th className='col-4 d-block'></th>
                        </tr>
                </thead>
                <tbody className='d-block ' style={{height:"39vh", overflow:"auto", tableLayout:"fixed"}}>
                    {employees ? employees.map((employee) => (
                        <tr key={employee.employeeID} id='employeeID'  className='row ms-3 me-1'>
                            <td className='col-4 d-block text-truncate' id='firstname'>{employee.firstname}</td>
                            <td className='col-4 d-block text-truncate' id='lastname'>{employee.lastname}</td>
                            <td className='col-4 d-block '>
                            <Button className='m-1' size='sm' variant="outline-info" onClick={()=>{emitHandleTeam(employee); emitHandleShow();}}>View</Button> 
                            {roles.find((role)=> (role === 'ROLE_LEAD') || (role === 'ROLE_ADMIN')) ? 
                            <><Button className='m-1' size='sm' variant="outline-danger" onClick={()=>{removeFromTeam(employee.id); window.location.reload();}}>Remove</Button></> : <></>}
                            </td>
                        </tr>
                    )) : (<></>)}
                </tbody>
            </Table>
        </div>
    );
};

export default ProjectTeamTable;