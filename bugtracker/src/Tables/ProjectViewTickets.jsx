import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import requestToPath from '../Services/fetchService';
import { useUser } from '../UserProvider/UserProvider';

const ProjectViewTickets = (props) => {
    const {projectId, emitHandleTicket, emitHandleTicketShow} = props;
    const user = useUser();
    const[tickets, setTickets] = useState(null);
    
    useEffect(()=> {
        requestToPath(`/api/tickets/projects/${projectId}/ticket`, "GET", user.jwt)
            .then((ticketsData) => {
                setTickets(ticketsData);
            }); 
    }, []);

    return (
        <div>
             <Table borderless responsive hover size='sm' className='table-condensed ' style={{width:"100", tableLayout: "fixed"}}>
                                <thead className='table-dark' style={{width:"100"}}>
                                        <tr className='row ms-3 me-3' style={{width:"100"}}>
                                            <th className='col-1 d-block'>Ticket No.</th>
                                            <th className='col-2 d-block text-truncate'>Title</th>
                                            <th className='col-2 d-block text-truncate'>Status</th>
                                            <th className='col-4 d-block text-truncate'>Description</th>
                                            <th className='col-3 d-block'></th>
                                        </tr>
                                </thead>
                                <tbody className='d-block' style={{height:"39vh", overflow:"auto", width:"100" }}>
                                    {tickets ? tickets.map((ticket, index) => (
                                        <tr key={ticket.id} className='row ms-3 me-3' style={{width:"100"}}>
                                            <td className='col-1 d-block'>{index+1}</td>
                                            <td className='col-2 d-block text-truncate'>{ticket.title}</td>
                                            <td className='col-2 d-block text-truncate'>{ticket.status}</td>
                                            <td className='col-4 d-block text-truncate'>{ticket.description}</td>
                                            <td className='col-3 d-block'>
                                            <Button className='m-1' size='sm' variant="outline-info" onClick={()=> {emitHandleTicket(ticket); emitHandleTicketShow();}}>View</Button>
                                            </td>
                                        </tr>
                                    )) : (<></>)}
                                </tbody>
                            </Table>
        </div>
    );
};

export default ProjectViewTickets;