import React, { useEffect, useRef, useState } from 'react';
import { Badge, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PriorityBadge from '../PriorityBadge/PriorityBadge';
import requestToPath from '../Services/fetchService';
import StatusBadge from '../StatusBadge/StatusBadge';
import { useUser } from '../UserProvider/UserProvider';

const TicketView = () => {
    const user = useUser();
    const [statusEnum, setStatusEnum] = useState([]);
    const [categoryEnums, setCategoryEnums] = useState([]);
    const [priorityEnums, setPriorityEnums] = useState([]);
    const [ticket, setTicket] = useState({
        title:"", description:"", category:"", priority:"", status:"", resolved_on:"",
    });
    const{ticketId} = useParams();
    const {projectId} = useParams();
    const prevTicket = useRef(ticket);
    const navigate = useNavigate();

    function updateTicket(prop, value){
        const newTicket = {...ticket};
        newTicket[prop] = value;
        setTicket(newTicket);
    }

    // change api request to api/project/id/tikets/id
    function save(){
        if(ticket.status === null || ticket.status === "new"){
            updateTicket("status", statusEnum[0].statusName);
        }
        else{
            hoard();
        }
    }

    function hoard(){
        requestToPath(`/api/tickets/${ticketId}`, "PUT", user.jwt, ticket)
        .then((ticketData) => {
            setTicket(ticketData);
            // navigate(`/projects/${projectId}`);
        });
    }

    useEffect(()=> {
        if(prevTicket.current.status !== ticket.status){
            hoard();
        }
        prevTicket.current = ticket;
    }, [ticket])


    // try changing api request to api/projects/id/tickets/id
    useEffect(() =>{
        requestToPath(`/api/tickets/${ticketId}`, "GET", user.jwt)
            .then((ticketResponse) => {
                let ticketData = ticketResponse.ticket;
            
                if(ticketData.title === null) ticketData.title = "";
                if(ticketData.category === null) ticketData.category = "";
                if(ticketData.priority === null) ticketData.priority = "";
                if(ticketData.description === null) ticketData.description = "";
                setTicket(ticketData);
                setStatusEnum(ticketResponse.statusEnums);
                setCategoryEnums(ticketResponse.categoryEnums);
                setPriorityEnums(ticketResponse.priorityEnums);
            }); 
    },[]);

    return (
        <Container className='mt-5 ticket-wrapper'>
                <Row>
                    <Col className='d-flex justify-contenet-center align-items-center'>
                        <h1 className='ms-3 mb-3 px-2' style={{margin:"-1em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Ticket {ticketId}</h1>
                        {/* <Badge pill className='ms-5 mb-1 px-2' style={{margin:"-3.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap", fontSize:"1em"}} bg="info">{ticket.status}</Badge> */}
                        <StatusBadge text = {ticket.status}/>
                    </Col>
                    <Row>
                        <Col>
                            <Badge pill className='ms-4 px-2' size='sm' bg="secondary" style={{fontSize:'1em'}}>{ticket.category}</Badge>
                            {/* <Badge pill className='ms-3 px-2' bg="primary" style={{fontSize:'1em'}}>{ticket.priority}</Badge> */}
                            <PriorityBadge text={ticket.priority}/>
                        </Col>
                    </Row>
                </Row>
            {ticket ? 
            (<>
            <div className='ms-4'>
                <Form.Group as={Row} className="mb-3 mt-3">
                    <Form.Label column sm="2">Title</Form.Label>
                    <Col sm="10">
                    <Form.Control id="title" style={{backgroundColor: "#f8f8f8"}} type="text" placeholder="title" onChange={(e)=> updateTicket("title", e.target.value)} value={ticket.title} />
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Category</Form.Label>
                    <Col sm="10">
                        <Form.Select onChange={(e) => updateTicket("category", e.target.value)}>
                            {ticket.category ? (<option>{ticket.category}</option>) : (<option>Select Category</option>)}
                            {categoryEnums.map((cateEnum)=> (
                                <option key={cateEnum.categoryNum} value={cateEnum.categoryName}>{cateEnum.categoryName}</option>    
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Status</Form.Label>
                    <Col sm="10">
                        <Form.Select onChange={(e) => updateTicket("status", e.target.value)}>
                            {ticket.status ? (<option>{ticket.status}</option>) : (<option>Select Status</option>)}
                            {statusEnum.map((statEnum)=> (
                                <option key={statEnum.statusNum} value={statEnum.statusName}>{statEnum.statusName}</option>    
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Priority</Form.Label>
                    <Col sm="10">
                        <Form.Select onChange={(e) => updateTicket("priority", e.target.value)}>
                        {ticket.priority ? (<option>{ticket.priority}</option>) : (<option>Select Priority</option>)}
                            {priorityEnums.map((priorityEnum)=> (  
                                <option key={priorityEnum.priorityNum} value={priorityEnum.priorityName}>{priorityEnum.priorityName}</option>    
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Description</Form.Label>
                    <Col sm="10">
                    <Form.Control id="description" style={{resize:"none", backgroundColor: "#f8f8f8"}} maxLength={255} rows={5} as='textarea' placeholder="description" onChange={(e)=> updateTicket("description", e.target.value)} value={ticket.description} />
                    </Col>
                </Form.Group>

                <Button variant="primary" className='' size='lg' onClick={()=>{save(); navigate(`/projects/${projectId}`);}}>Submit</Button>
                <Button variant="secondary" className='ms-2' size='lg' onClick={()=>{navigate(`/projects/${projectId}`);}}>Back</Button>
                </div>
            </>) 
            : 
            (<></>) }
            
        </Container>
    );
};

export default TicketView;