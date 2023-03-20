import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import requestToPath from "../Services/fetchService";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from '../UserProvider/UserProvider';

function NavBar(){
    const user = useUser();
    const[currUser, setCurrUser] = useState({});
    const [roles, setRoles] = useState([]);
    const {projectId} = useParams();
    const navigate = useNavigate();


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

    useEffect(() =>{
        requestToPath("/api/users/myDetails", "GET", user.jwt)
        .then((userData) =>{
            setCurrUser(userData);
        })
    },[user.jwt])  

    return(
            <Navbar bg="dark" variant="dark" style={{width:"10%", height:"100vh", paddingTop:"0", position:"fixed"}}>
            
                <Container className="flex-column text-center">
                <h5 style={{color:"white"}}>{currUser.firstname}</h5>
                <h5 style={{color:"white"}}>{currUser.lastname}</h5>
                    <Navbar.Brand href="/dashboard"><h3 className="mt-5">Navbar Logo</h3></Navbar.Brand>
                        <Nav className="flex-column mt-5 " >
                            <Nav.Link className="navButton" href="/dashboard"><h4>Dashboard</h4></Nav.Link>
                            <Nav.Link className="navButton" href="/myTickets"><h4>Tickets</h4></Nav.Link>
                            {roles.find((role) => (role === 'ROLE_LEAD') || (role === 'ROLE_ADMIN')) ? 
                                projectId ? 
                                    (<Nav.Link className="navButton" href={`/projects/${projectId}/projectTickets`}><h4>Project Tickets</h4></Nav.Link>)
                                    : (<></>) : (<></>)
                            }
                            {roles.find((role) => role === 'ROLE_ADMIN') ? ((<Nav.Link className="navButton" href="/EmployeeProjects"><h4>Projects</h4></Nav.Link>) ) : <></>
                            }
                            {roles.find((role) => role === 'ROLE_ADMIN') ? ((<Nav.Link className="navButton" href="/ManageEmployee"><h4>Employee</h4></Nav.Link>) ) : <></>
                            }
                            <Nav.Link className="navButton" href="/changePassword"><h4>Change Password</h4></Nav.Link>
                        </Nav>
                            <div className='d-block' onClick={()=>{user.setJwt(null); navigate('/login');}} style={{marginTop: "15em",cursor: "pointer", fontSize:"10px", color:"white", marginLeft:"auto", marginRight:"auto"}}>
                                <h4>Logout</h4>
                            </div>  
                </Container>
            </Navbar>
    );
}

export default NavBar;