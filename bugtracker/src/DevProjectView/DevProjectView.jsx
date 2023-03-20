import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row} from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import requestToPath from '../Services/fetchService';
import { useUser } from '../UserProvider/UserProvider';
import {useNavigate, useParams} from "react-router-dom";
import CommentContainer from '../CommentContainer/CommentContainer';
import ProjectTeamTable from '../Tables/ProjectTeamTable';
import ProjectTeamModals from '../Modals/ProjectTeamModals';
import ProjectViewTickets from '../Tables/ProjectViewTickets';
import ProjectTicketModals from '../Modals/ProjectTicketModals';

const DevProjectView = () => {
    const user = useUser();
    const {projectId} = useParams();
    const [show, setShow] = useState(false);
    const [showTicket, setShowTicket] = useState(false);
    const [otherTicket, setOtherTicket] = useState({title: '', status: '', priority:'', category:'', description: '', created_on:'', resolved_on:''});
    const [team, setTeam] = useState({ firstname: '', lastname:'', employeeID:''});
    const [project, setProject] = useState({ projectTitle:"", projectDescription:"", projectCreated:"" });
    const navigate = useNavigate();
    
    function handleTeam(employee){setTeam({firstname: employee.firstname, lastname: employee.lastname, employeeID: employee.employeeID});}
    function handleTicket(dataTicket){setOtherTicket({title: dataTicket.title, status: dataTicket.status, priority: dataTicket.priority, category: dataTicket.category, description: dataTicket.description})}
    function createTicket(){
        requestToPath(`/api/tickets/projects/${projectId}/ticket`, "POST", user.jwt)
            .then((ticketData) => {
                navigate(`/projects/${projectId}/tickets/${ticketData.id}`);
            });
    }

    function handleClose(){ setShow(false); }
    function handleShow(){ setShow(true); }
    function handleTicketClose(){ setShowTicket(false); }
    function handleTicketShow(){ setShowTicket(true); }

    useEffect(() =>{
        requestToPath(`/api/projects/${projectId}`, "GET", user.jwt)
            .then((projectData) => {
                setProject(projectData);
            }); 
    },[]);

    return (
        <div className='mw-100 d-flex' style={{width:"100vw", height:"100vh", margin: "0", padding: "0" }}>   
            <NavBar/>
            <Row className='mw-100' style={{paddingLeft:"10%",marginLeft:"auto", marginRight:"auto"}}>
                <h1 className='text-center'>Project {projectId}</h1>

                {/* ********** Team section ********** */}
                <Col md={4}>
                <Row>
                    <Col>
                        <div className='container team-wrapper mt-5 mb-5'>
                            <h2 className='ms-3 mb-3 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Team</h2> 
                            {/* ********** shows Employee Table ********** */}
                            <ProjectTeamTable projectId={projectId} emitHandleShow={handleShow} emitHandleTeam={handleTeam}/>
                                    
                            {/* ********** Modal to view employee details ********** */}
                            <ProjectTeamModals show={show} emitHandleClose={handleClose} team={team} />
                        </div>
                    </Col>
                </Row>
                {/* ********** Project section ********** */}
                <Row>
                    <Col>
                        <div className='container project-wrapper-update'>
                            {project ? (<div key={project.id}>
                                <h2 className='ms-3 mb-3 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Project</h2>
                                <Card style={{height:"28vh", border:"none"}}>
                                    <Card.Body>
                                        <Card.Title><h3 className='text-center mb-3' style={{margin:"-1.2em", whiteSpace: "nowrap"}}>{project.projectTitle}</h3></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{project.projectCreated}</Card.Subtitle>
                                        <Card.Text className='mt-3'>     
                                            {/* <Form.Control size='lg' style={{height:"12vh"}} as='textarea' placeholder='description' id='projectDescription' onChange={(e) => updateProject("projectDescription", e.target.value)} value={project.projectDescription}/> */}
                                           {project.projectDescription}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                </div>) : (<></>) 
                            }
                        </div>                        
                    </Col>
                </Row>
                </Col>
                {/* ********** Tickets Section ********** */}
                <Col md={8} >
                <Row style={{width:"100"}}>
                    <Col style={{width:"100"}}>
                        <div className='container mt-5 ticket-wrapper'>
                            <h2 className='ms-3 mb-3 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Tickets</h2> 
                            <div className='d-flex justify-content-end mb-3' style={{marginTop:"-3em"}}>
                                <Button size='sm' variant='primary' className='me-3 px-2' style={{ width:"min-content", whiteSpace:"nowrap"}} onClick={()=>{createTicket();}}>Add Ticket</Button>
                            </div>
                        {/* ********** Ticket in-progress Table ********** */}    
                        <ProjectViewTickets projectId={projectId} emitHandleTicket={handleTicket} emitHandleTicketShow={handleTicketShow} />
                        
                        {/* ********** Ticket view Modal ********** */}                
                        <ProjectTicketModals showTicket={showTicket} emitHandleTicketClose={handleTicketClose} otherTicket={otherTicket} />
                        </div>
                    </Col>
                </Row>

                {/* ********** Comment section ********** */}
                <Row>
                    <Col>
                    <CommentContainer projectId = {projectId}/>
                    </Col>
                </Row>

                </Col>
            </Row>
        </div>
    );
};

export default DevProjectView;