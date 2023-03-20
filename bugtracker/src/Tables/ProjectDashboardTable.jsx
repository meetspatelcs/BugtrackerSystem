import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useUser } from '../UserProvider/UserProvider';

const ProjectDashboardTable = (props) => {
    const user = useUser();
    const {tableProjects, emitHandleClick, emitHandleShow, emitHandleDeleteProject} = props;
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);

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

    return (
        <div>
            <Table responsive borderless hover size='sm' className='table-condensed' style={{tableLayout:"fixed"}} >
                        <thead className='text-center table-dark'>
                            <tr className='row ms-3 me-3'>
                                <th className='col-3 d-block text-truncate'>Title</th>
                                <th className='col-6 d-block text-truncate'>Description</th>
                                <th className='col-3 d-block ' ></th>
                            </tr>
                        </thead>
                        <tbody className='d-block ' style={{height:"39vh",  overflow:"auto"}}>
                        {tableProjects ? tableProjects.map((project) => (
                            <tr key={project.id} className='row ms-3 me-3' >
                                <td className='col-3 d-block text-truncate'>{project.projectTitle}</td>
                                <td className='col-6 d-block text-truncate'>{project.projectDescription}</td>
                                <td className='col-3 d-block'>
                                {/* <Button className='m-1' variant="outline-info" onClick={()=>{ handleClick(project); handleShow();}}>View</Button>  */}
                                <Button className='m-1' variant="outline-info" onClick={()=>{ emitHandleClick(project); emitHandleShow();}}>View</Button> 
                                <Button className='m-1' variant="outline-warning" onClick={()=> {navigate(`/projects/${project.id}`);}}>Update</Button>
                                 {
                                 roles.find((role) => (role === 'ROLE_LEAD') || (role === 'ROLE_ADMIN')) ? 
                                 <><Button className='m-1' variant="outline-danger" onClick={() => {emitHandleDeleteProject(project.id)}}>Delete</Button></> : <></>   
                                 }
                                   
                                </td>
                            </tr>
                        )) : (<></>)}
                        </tbody>
            </Table>
        </div>
    );
};

export default ProjectDashboardTable;