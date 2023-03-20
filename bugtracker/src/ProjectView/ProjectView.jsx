import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import requestToPath from '../Services/fetchService';
import { useLocalState } from '../Util/useLocalStorage';

const ProjectView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const projectId = window.location.href.split("/projects/")[1];
    const [users, setUsers] = useState(null);
    const [show, setShow] = useState(false);
    const [employees, setEmployees] = useState(null);
    const [tickets, setTickets] = useState(null);
    const [addEmpShow, setAddEmpShow] = useState(false);

    const [team, setTeam] = useState({ firstname: '', lastname:'', employeeID:''});
    const [project, setProject] = useState({ projectTitle:"", projectDescription:"", projectCreated:"" });
    const navigate = useNavigate();
    
    function updateProject(prop, value){
        const newProject = {...project};
        newProject[prop] = value;
        setProject(newProject);
    }

    function handleTeam(employee){setTeam({firstname: employee.firstname, lastname: employee.lastname, employeeID: employee.employeeID});}

    function save(){
        requestToPath(`/api/projects/${projectId}`, "PUT", jwt, project)
            .then((projectData) => {
                setProject(projectData);                
            });
    }
    
    function createTicket(){
        requestToPath(`/api/tickets/projects/${projectId}/ticket`, "POST", jwt)
            .then((ticketData) => {
                navigate(`/projects/${projectId}/tickets/${ticketData.id}`);
            });
    }

    function assign(userId){
        requestToPath(`/api/projects/${projectId}/users/${userId}`, "PUT", jwt)
        .then((userProjectData) => {
        })        
    }

    function reload(){reload = window.location.reload()};

    function handleClose(){ setShow(false); }
    function handleShow(){ setShow(true); }

    function handleEmployeeShow() { setAddEmpShow(true); }
    function handleEmployeeClose() { setAddEmpShow(false); }

    useEffect(()=> {
        requestToPath(`/api/tickets/projects/${projectId}/ticket`, "GET", jwt)
            .then((ticketsData) => {
                setTickets(ticketsData);
            }); 
        }, []);

    useEffect(() =>{
        requestToPath(`/api/projects/${projectId}`, "GET", jwt)
            .then((projectData) => {
                setProject(projectData);
            }); 
    }, []);

    useEffect(() => {
        requestToPath(`/api/projects/${projectId}/users`, "GET", jwt)
        .then((projectTeam) => {
            setEmployees(projectTeam);
        });
    },[]);

    useEffect(()=> {
        requestToPath("/api/users", "GET", jwt)
            .then((usersData) => {
                setUsers(usersData);
            }); 
    }, []);

    return (
        <div className='mw-100'>   
            <h1 className='text-center'>Project {projectId}</h1>

            <Row className='mw-100'>
                <Col md={1}></Col>

                <Col md={3}>
                <Row>
                    <Col>
                        <div>
                            <h2 className='ms-3 mb-4 mt-5'>Team</h2> 
                            <div className='ms-3 d-flex justify-content-end me-3 mb-3'>
                                <Button size='sm' onClick={() => {handleEmployeeShow();}}>Add Employee</Button>
                            </div>
                            <Table responsive borderless hover size='sm' className='table-condensed' >
                                <thead className='text-center table-dark'>
                                        <tr className='row ms-3 me-3'>
                                            <th className='col-4 d-block text-truncate' >First</th>
                                            <th className='col-4 d-block text-truncate' >Last</th>
                                            <th className='col-4 d-block ' ></th>
                                        </tr>
                                </thead>
                                <tbody className='d-block ' style={{height:"39vh",  overflow:"auto"}}>
                                    {employees ? employees.map((employee) => (
                                        <tr key={employee.employeeID} id='employeeID'  className='row ms-3 me-3'>
                                            <td className='col-4 d-block text-truncate' id='firstname'>{employee.firstname}</td>
                                            <td className='col-4 d-block text-truncate' id='lastname' >{employee.lastname}</td>
                                            <td className='col-4 d-block '>
                                            <Button className='m-1' size='sm' variant="outline-info" onClick={()=>{handleShow(); handleTeam(employee);}}>View</Button> 
                                            <Button className='m-1' size='sm' variant="outline-danger">Delete</Button>  
                                            </td>
                                        </tr>
                                    )) : (<></>)}
                                </tbody>
                            </Table>
                                    
                                        {/* Modal to view employee details  */}
                                <Modal size='sm' show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title><h1>Ticket {team.firstname}</h1> </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body> 
                                        <h2 className='text-center mb-5'>{team.lastname}</h2> 
                                        <p className='mt-5'>{team.employeeID}</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal size='lg' show={addEmpShow} onHide={handleEmployeeClose}>
                                    <Modal.Header closeButton>
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
                                            <Button className='m-1' size='sm' onClick={()=>{assign(myUser.id);}} >Add</Button>  
                                            </td>
                                        </tr>
                                    )) : (<></>)}
                                </tbody>
                            </Table>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={()=>{handleEmployeeClose(); reload()}}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>  
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className='ms-3'>
                            {project ? (<div key={project.id}>
                                <h2>Project</h2>
                                <Card className='mt-2 me-3' style={{height:"27vh"}}>
                                    <Card.Body>
                                        <Card.Title><h3>{project.projectTitle}</h3></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{project.projectCreated}</Card.Subtitle>
                                        <Card.Text>     
                                            <Form.Control size='lg' style={{height:"12vh"}} as='textarea' placeholder='description' id='projectDescription' onChange={(e) => updateProject("projectDescription", e.target.value)} value={project.projectDescription}/>
                                        </Card.Text>
                                        <Button variant='outline-warning' onClick={() => save() }>Update</Button>
                                    </Card.Body>
                                </Card>
                                </div>) : (<></>) 
                            }
                        </div>                        
                    </Col>
                </Row>
                </Col>
                
                <Col md={8} >
                            {/* write your code here */}
                <Row style={{width:"100"}}>
                    <Col style={{width:"100"}}>
                        <div className='container'>
                            <h2 className='ms-3 mb-4 mt-5'>Tickets</h2> 
                            <div className='ms-3 d-flex justify-content-end mb-3'>
                                <Button size='sm' onClick={()=>{createTicket();}}>Add Ticket</Button>
                            </div>
                            <Table responsive borderless hover size='sm' className='table-condensed' style={{width:"100", tableLayout:"fixed"}}>
                                <thead className='table-dark' style={{width:"100"}}>
                                        <tr className='row ms-3 me-3' style={{width:"100"}}>
                                            <th className='col-1 d-block'>Ticket No.</th>
                                            <th className='col-2 d-block text-truncate'>Title</th>
                                            <th className='col-1 d-block text-truncate'>Status</th>
                                            <th className='col-5 d-block text-truncate'>Description</th>
                                            <th className='col-3 d-block' ></th>
                                        </tr>
                                </thead>
                                <tbody className='d-block ' style={{height:"39vh", overflow:"auto"}}>
                                    {tickets ? tickets.map((ticket) => (
                                        <tr key={ticket.id} className='row ms-3 me-3' style={{width:"100"}}>
                                            <th className='col-1 d-block ' >999</th>
                                            <td className='col-2 d-block text-truncate'>{ticket.title}</td>
                                            <td className='col-1 d-block text-truncate'>{ticket.status}</td>
                                            <td className='col-5 d-block text-truncate'>{ticket.description}</td>
                                            <td className='col-3 d-block '>
                                            <Button className='m-1' size='sm' variant="outline-info">View</Button>
                                            <Link to={`/projects/${projectId}/tickets/${ticket.id}`}><Button className='m-1' size='sm' variant="outline-warning">Update</Button></Link> 
                                            <Button className='m-1' size='sm' variant="outline-danger">Delete</Button>  
                                            </td>
                                        </tr>
                                    )) : (<></>)}
                                </tbody>
                            </Table>
                                    

                                <Modal size='sm' show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title><h1>Ticket {team.firstname}</h1> </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body> 
                                        <h2 className='text-center mb-5'>{team.lastname}</h2> 
                                        <p className='mt-5'>{team.employeeID}</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal> 
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>

                    </Col>
                    <Col>

                    </Col>
                    <Col>

                    </Col>
                </Row>

                </Col>
            </Row>
        </div>
    );
};

export default ProjectView;