import React, { useEffect, useState } from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider/UserProvider';
import { useLocalState } from '../Util/useLocalStorage';

const LoginCompo = () => {
    const user = useUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    // const [jwt, setJwt] = useLocalState("", "jwt");
    const navigate = useNavigate();

    useEffect(()=> {
        if(user.jwt)
            navigate("/dashboard");
        
    },[user]);

    function sendLoginRequest(){
        const reqBody = {
            username: username,
            password: password,
        };

        fetch("api/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        }).then((response)=>{
            if(response.status === 200)
                return Promise.all([response.json(), response.headers]);
            else
                return Promise.reject("Invalid login attempt!");
        }).then(([body, headers]) => {
            user.setJwt(headers.get("authorization"));
            // window.location.href = "/dashboard";
        }).catch((message) => {
            alert(message);
        });
    };

    return (
            <Container className='mt-5'>
                        <Row className='justify-content-center'>
                            <Col md="4">
                                <h1 className='mt-5 mb-5 text-center'>Log In</h1>         
                                <Form.Group className="mb-4" controlId="email">    
                                    <Form.Label className="fs-4">Employee Id: </Form.Label>
                                        <Form.Control size="lg" type="Email" placeholder="Email" onChange={(e) => setUsername(e.target.value)} />   
                                </Form.Group>                
                            </Col>
                        </Row>

                        <Row className='justify-content-center'>
                            <Col md="4">
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label className="fs-4">Password</Form.Label>
                                        <Form.Control  size="lg" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group> 
                            </Col>
                        </Row>
    
                        <Row className='justify-content-center'>
                            <Col md="4" className="mt-5 d-flex flex-column  justify-content-center">
                                <Button  size="lg" className="btn" onClick={() => sendLoginRequest()}>Login</Button>
                            </Col>
                        </Row>
            </Container>
        
    );
};

export default LoginCompo;