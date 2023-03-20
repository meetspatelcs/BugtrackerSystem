import React from 'react';
import { Button } from 'react-bootstrap';

const home = () => {
    return (
        <div style={{display: "flex", alignItems:"center", justifyContent:"center", height:"100vh"}}>
            
                <Button size='lg' variant='outline-primary' href='/login'>Log in</Button>
            
        </div>
    );
};

export default home;