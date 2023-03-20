import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import requestToPath from '../Services/fetchService';
import { useUser } from '../UserProvider/UserProvider';

const ProjectAllTicketsTable = (props) => {
    const user = useUser();
    const {projectId,  currStat} = props;
    const[tableTickets, setTableTickets] = useState([]);
    const navigate = useNavigate();

    function validateStat(){
        if(tableTickets && tableTickets.filter(ticket => ticket.status === currStat).length > 0)
            return true;
        else 
            return false;
    }

    function getHeight(){
        if(validateStat())
            return "38vh";
        else
            return "5vh";    
    }

    useEffect(()=> {
        requestToPath(`/api/tickets/projects/${projectId}/projectTickets`, "GET", user.jwt)
            .then((ticketsData) => {
                setTableTickets(ticketsData);
            }); 
        }, []);

    return (
        <div>
            <Table responsive borderless hover size='sm' className='table-condensed' style={{tableLayout:"fixed"}} >
                    <thead className='table-dark'>
                        <tr className='row ms-3 me-3'>
                            <th className='col-2 d-block text-truncate'>Title</th>
                            <th className='col-2 d-block text-truncate'>Priority</th>
                            <th className='col-6 d-block text-truncate'>Description</th>
                            <th className='col-2 d-block' ></th>
                        </tr>
                    </thead>
                    <tbody className='d-block' style={{height: getHeight(),  overflow:"auto"}}>
                    {validateStat() ? tableTickets.filter(ticket => ticket.status === 'In-Progress').map((ticket) => (
                        <tr key={ticket.id} className='row ms-3 me-3' >
                            <td className='col-2 d-block text-truncate'>{ticket.title}</td>
                            <td className='col-2 d-block text-truncate'>{ticket.priority}</td>
                            <td className='col-6 d-block text-truncate'>{ticket.description}</td>
                            <td className='col-2 d-block'>
                            {/* <Button className='m-1' variant="outline-info" onClick={()=>{ }}>View</Button>  */}
                            <Button className='m-1' variant="outline-warning" onClick={()=>{navigate(`/projects/${ticket.project.id}/tickets/${ticket.id}`);}}>Update</Button>
                            <Button className='m-1' variant="outline-danger">Delete</Button>  
                            </td>
                        </tr>
                    )) : (<tr><td>No Tickets to show!</td></tr>)}
                    </tbody>
                </Table>
        </div>
    );
};

export default ProjectAllTicketsTable;