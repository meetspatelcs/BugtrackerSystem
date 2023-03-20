import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import requestToPath from '../Services/fetchService';

import { useUser } from '../UserProvider/UserProvider';

const ChangePass = () => {
    const user = useUser();
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function validateAndUpdatePassword(){
        const reqBody = {
            oldPassword: oldPassword,
            password: password,
        };

        requestToPath('/api/accounts/changePassword', "POST", user.jwt, reqBody)
        .then((userData) => {
            if(userData === undefined){
                return Promise.reject("Bad Credentials!");
            }
            else{
                navigate(-1);
            }
        }).catch((message) =>{
            alert(message);
        })
    }

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height:"100vh"}}>
            <div>
            <Row className=''>
                <Col md="12">
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label className="fs-4">Old Password</Form.Label>
                            <Form.Control  size="lg" type="password" placeholder="Password" onChange={(e) => setOldPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label className="fs-4">New Password</Form.Label>
                            <Form.Control  size="lg" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button size="lg" className="btn 100" onClick={() => {validateAndUpdatePassword()}}>Change Password</Button>
                    <Button size="lg" className="ms-5" variant='secondary' onClick={() => {navigate("/dashboard")}}>Back</Button> 
                </Col>
            </Row>
            </div>
        </div>
    );
};

export default ChangePass;
