import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import requestToPath from '../Services/fetchService';
import { useUser } from '../UserProvider/UserProvider';

import { useLocalState } from '../Util/useLocalStorage';

const EmployeeView = () => {
    const user = useUser();
    // const[jwt, setJwt] = useLocalState("", "jwt");
    const[employee, setEmployee] = useState({firstname: '', lastname:'', employeeID:'', startDate:'', leaveDate:''});
    // const[accountId, setAccountId] = useState(null);
    // const[validateAccount, setValidateAccount] = useState({});
    // const[authority, setAuthority] = useState({authority: ''});
    // const[authorityEnum, setAuthorityEnum] = useState([]);
    // const userId = window.location.href.split("/employees/")[1];
    const{userId} = useParams();
    const navigate = useNavigate();

    function updateEmployee(prop, value){
        if(prop === 'startDate'){
            const current = new Date();
            const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
            value = date;
        }
        if(prop === 'leaveDate'){
            const current = new Date();
            const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
            value = date;
        }
        const newEmployee = {...employee};
        newEmployee[prop] = value;
        setEmployee(newEmployee);
    }

    function save(){
        requestToPath(`/api/users/${userId}`, "PUT", user.jwt, employee)
        .then((empData) => {
            setEmployee(empData);
        })
    }

    // gets the information of a user with path var
    useEffect(() => {
        requestToPath(`/api/users/${userId}`, "GET", user.jwt)
        .then((emp) => {
            if(emp.firstname === null) emp.firstname = "";
            if(emp.lastname === null) emp.lastname = "";
            if(emp.employeeID === null) emp.employeeID = "";
            setEmployee(emp);

        })
    },[]);

    // validate user has account using userId
    useEffect(() => {
        requestToPath(`/api/accounts/validateAccount/${userId}`, "GET", user.jwt)
        .then((somedata) =>{
        })
    }, []);

    return (
                
           <Container className='mt-5 ticket-wrapper'>
                    <h1 className='ms-3 mb-3 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Employee</h1>
                {employee ? (<>
                    <div className='ms-4'>
                        <Form.Group as={Row} className="mb-3 mt-3">
                            <Form.Label column sm="2">First Name</Form.Label>
                            <Col sm="10">
                            <Form.Control id="firstname" type="text" placeholder="first" onChange={(e)=> updateEmployee("firstname", e.target.value)} value={employee.firstname} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 mt-3">
                            <Form.Label column sm="2">Last Name</Form.Label>
                            <Col sm="10">
                            <Form.Control id="last" type="text" placeholder="Last" onChange={(e)=> updateEmployee("lastname", e.target.value)} value={employee.lastname} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 mt-3">
                            <Form.Label column sm="2">Employee ID</Form.Label>
                            <Col sm="10">
                            <Form.Control style={{border:"none"}} id="empid" type="text" readOnly  placeholder="Employee ID" onChange={(e)=> updateEmployee("empployeeID", e.target.value)} value={employee.employeeID} />
                            </Col>
                        </Form.Group>

                        {employee.startDate ? (<>
                            <Form.Group as={Row} className="mb-3 mt-3">
                            <Form.Label column sm="2">Join Data</Form.Label>
                            <Col sm="10">
                            <Form.Control style={{border:"none"}} id="startDate" readOnly type="text" placeholder="YYYY-MM-DD" onChange={(e)=> updateEmployee("startDate", e.target.value)} value={employee.startDate} />
                            </Col>
                            </Form.Group>
                        </>) : 
                        (<>
                            <Form.Group as={Row} className="mb-3 mt-3">
                            <Form.Label column sm="2">Join Data</Form.Label>
                            <Col sm="10">
                            <Button variant='outline-primary' onClick={(e) => updateEmployee("startDate", e.target.value)} value={employee.startDate}>Assign</Button>
                            </Col>
                            </Form.Group>
                        </>)}
                        
                        {employee.leaveDate ? (<>
                            <Form.Group as={Row} className="mb-3 mt-3">
                            <Form.Label column sm="2">Leave Data</Form.Label>
                            <Col sm="10">
                            <Form.Control style={{border:"none"}} id="leaveDate" readOnly type="text" placeholder="YYYY-MM-DD" onChange={(e)=> updateEmployee("startDate", e.target.value)} value={employee.startDate} />
                            </Col>
                            </Form.Group>
                        </>) : 
                        (<>
                            <Form.Group as={Row} className="mb-3 mt-3">
                            <Form.Label column sm="2">Leave Data</Form.Label>
                            <Col sm="10">
                            
                            <Button variant='outline-primary' onClick={(e) => updateEmployee("leaveDate", e.target.value)} value={employee.leaveDate}>Assign</Button>
                            </Col>
                            </Form.Group>

                        </>)}    

                        {/* {validateAccount.idaccount ? (
                            <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Authority</Form.Label>
                                <Col sm="10">
                                    <Form.Select >
                                        {authority ? (<option>{authority.authority}</option>) : (<option>Select Authority</option>)}

                                            {authorityEnum.map((authEnum)=> (
                                                <option key={authEnum.authNum} value={authEnum.authorityName}>{authEnum.authName}</option>))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>) : (<>nothing</>)} */}


                            <Button onClick={()=> {save(); navigate("/ManageEmployee");}}>Submit</Button>
                            <Button className='ms-5' onClick={() => {navigate("/ManageEmployee");}} variant='outline-secondary'>Back</Button>
                </div>    
                </>) : ( <></> )}
            </Container>
    );
};

export default EmployeeView;