import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import requestToPath from '../Services/fetchService';
import { useUser } from '../UserProvider/UserProvider';

const SignupCompo = () => {
    const user = useUser();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [empId, setEmpId] = useState({}); 

    useEffect(() => {
        if(user.jwt)
        navigate("/dashboard");
    }, [user]);
    
    function getUserId(){
        fetch(`api/users/${empId}`, {
            headers: {
                "Content-Type" : "application/json",
            },
            method: "GET",
        })
        .then((response) => {
            if(response.status === 200)
                return response.json();
        })
        .then((myData) => {
            setEmpId(myData);
        })
    }

    function createAndLoginUser() {
        const reqBody = {
            username: username,
            password: password,
        };

        fetch("api/accounts/signup", {
            headers: {
                "Content-Type" : "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
        .then((response) => {
            if(response.status === 200)
                return Promise.all([response.json(), response.headers]);
            else
                return Promise.reject("Invalid login attempt");
        })
        .then(([body, headers]) =>{
            user.setJwt(headers.get("authorization"));
        })
        .catch((message) => {
            alert(message);
        });
    }

    return (
        <Container className='mt-5'>
        <Row className='justify-content-center'>
            <Col md="4">
                <h1 className='mt-5 mb-5 text-center'>Sign Up</h1>         
                <Form.Group className="mb-4" controlId="email">    
                    <Form.Label className="fs-4">Email address</Form.Label>
                        <Form.Control size="lg" type="Email" placeholder="example@mail.com" value={username} onChange={(e) => setUsername(e.target.value)} />   
                </Form.Group>                
            </Col>
        </Row>

        <Row className='justify-content-center'>
            <Col md="4">
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="fs-4">Password</Form.Label>
                        <Form.Control  size="lg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group> 
            </Col>
        </Row>

        <Row className='justify-content-center'>
            <Col md="4" className="mt-5 d-flex flex-column  justify-content-center">
                <Button  size="lg" className="btn" onClick={() => createAndLoginUser()}>Sign Up</Button>
            </Col>
        </Row>
</Container>
    );
};

export default SignupCompo;