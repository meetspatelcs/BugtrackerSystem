import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import requestToPath from '../Services/fetchService';
import { useUser } from '../UserProvider/UserProvider';


const ManageEmployee = () => {
    const user = useUser();
    // const[jwt, setJwt] = useLocalState("", "jwt");
    const[employees, setEmployees] = useState([]); // was null before []
    const navigate = useNavigate();

        // create a user in the database
        function createEmployee(){
            requestToPath("api/users", "POST", user.jwt)
            .then((employee) => {
                navigate(`/employees/${employee.id}`);
            })
        }

        // gets all users in the database
        useEffect(()=> {
            requestToPath("api/users", "GET", user.jwt)
                .then((employeesData) => {
                    setEmployees(employeesData);
                }); 
        }, []);

    return (
        <div className='d-flex' style={{width:"100vw", height:"100vh", margin: "0", padding: "0" }}>
            <NavBar/>
            
            <div className='d-block' style={{paddingLeft:"10%", marginLeft:"auto", marginRight:"auto"}}>
            <h1 className='text-center'>Manage Employee</h1>
            <Container className='project-wrapper mt-5' >
            <h2 className='ms-3 mb-3 px-2' style={{margin:"-1.7em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Employees</h2>
               {/* container only for button */}
                <div className='d-flex justify-content-end mb-4' style={{marginTop:"-3.5em" }}>
                <Button size="lg" variant="primary" className='me-3 px-2' style={{ width:"min-content", whiteSpace:"nowrap"}} onClick={() => createEmployee()}>New Employee</Button>
                </div>    
                <Table responsive borderless hover size='sm' className='table-condensed' style={{tableLayout:"fixed"}}>
                    <thead className=' table-dark'>
                        <tr className='row ms-3 me-3'>
                            <th className='col-4 d-block text-truncate' >First</th>
                            <th className='col-4 d-block text-truncate' >Last</th>
                            <th className='col-4 d-block ' ></th>
                        </tr>
                    </thead>
                    <tbody className='d-block ' style={{height:"39vh",  overflow:"auto"}}>
                    {employees ? employees.map((employee) => (
                        <tr key={employee.id} className='row ms-3 me-3' >
                            <td className='col-4 d-block text-truncate'>{employee.firstname}</td>
                            <td className='col-4 d-block text-truncate'>{employee.lastname}</td>
                            <td className='col-4 d-block'>
                            {/* <Button className='m-1' variant="outline-info" onClick={()=>{ handleClick(project); handleShow();}}>View</Button>  */}
                            <Button className='m-1' variant="outline-warning" onClick={()=> {navigate(`/employees/${employee.id}`);}}>Update</Button>  
                            </td>
                        </tr>
                    )) : (<></>)}
                    </tbody>
                </Table>

            </Container>
            </div>
        </div>
    );
};

export default ManageEmployee;