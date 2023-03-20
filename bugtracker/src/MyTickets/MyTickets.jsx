import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';

import MyTicketsTable from '../Tables/MyTicketsTable';
import { useUser } from '../UserProvider/UserProvider';

const MyTickets = () => {
    const user = useUser();

    return (
        <div className='d-flex' style={{ height:"100vh", margin: "0", padding: "0" }}>
        <NavBar/>
            <div className='d-block' style={{paddingLeft:"10%", marginLeft:"auto", marginRight:"auto"}}>
                <Container className='ticket-wrapper mt-5 '>
                    <h2 className='ms-3 mb-4 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Tickets In-Progress</h2>
                    <MyTicketsTable currStat={'In-Progress'} />
                </Container>

                <Container className='ticket-wrapper mt-5 '>
                    <h2 className='ms-3 mb-4 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Tickets Resolved</h2>
                    <MyTicketsTable currStat={'Resolved'} />
                </Container>

                <Container className='ticket-wrapper mt-5 '>
                    <h2 className='ms-3 mb-4 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Tickets New</h2>
                    <MyTicketsTable currStat={'New'} />
                </Container>

                <Container className='ticket-wrapper mt-5 '>
                    <h2 className='ms-3 mb-4 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Tickets Open</h2>
                    <MyTicketsTable currStat={'Open'} />
                </Container>

                <Container className='ticket-wrapper mt-5 '>
                    <h2 className='ms-3 mb-4 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Tickets Closed</h2>
                    <MyTicketsTable currStat={'Closed'} />
                </Container>
            </div>
        </div>
    );
};

export default MyTickets;