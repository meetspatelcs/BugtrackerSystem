import React from 'react';
import {  Container } from 'react-bootstrap';
import {  useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

import ProjectAllTicketsTable from '../Tables/ProjectAllTicketsTable';
import { useUser } from '../UserProvider/UserProvider';


const LeadProjectTickets = () => {
    const user = useUser();
    const {projectId} = useParams();

    return (
        <div className='d-flex' style={{ height:"100vh", margin: "0", padding: "0" }}>
            <NavBar/>

            <div className='d-block' style={{paddingLeft:"10%",marginLeft:"auto", marginRight:"auto"}}>
                <h1>Project: {projectId}</h1>

            <Container className='ticket-wrapper mt-5 '>
                <h2 className='ms-3 mb-4 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Tickets In-Progress</h2>
                <ProjectAllTicketsTable projectId={projectId}  currStat={'In-Progress'} />
            </Container>

            <Container className='ticket-wrapper mt-5 '>
                <h2 className='ms-3 mb-4 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Tickets Resolved</h2>
                <ProjectAllTicketsTable projectId={projectId}  currStat={'Resolved'} />
            </Container>

            <Container className='ticket-wrapper mt-5 '>
                <h2 className='ms-3 mb-4 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Tickets New</h2>
                <ProjectAllTicketsTable projectId={projectId}  currStat={'New'} />
            </Container>

            <Container className='ticket-wrapper mt-5 '>
                <h2 className='ms-3 mb-4 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Tickets Open</h2>
                <ProjectAllTicketsTable projectId={projectId}  currStat={'Open'} />
            </Container>

            <Container className='ticket-wrapper mt-5 '>
                <h2 className='ms-3 mb-4 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Tickets Closed</h2>
                <ProjectAllTicketsTable projectId={projectId} currStat={'Closed'} />
            </Container>
            </div>
        </div>
    );
};

export default LeadProjectTickets;