import React from 'react';
import { Badge } from 'react-bootstrap';

const PriorityBadge = (props) => {
    const  {text} = props;

    function getBadgeColor(){
        if(text === "Low")
            return "success";
        else if(text === "Medium")
            return "warning";
        else if(text === "High")
            return "danger";
    }

    return (
        
            <Badge pill className='ms-3 px-2' bg={getBadgeColor()} style={{fontSize:'1em'}}>{text}</Badge>
       
    );
};

export default PriorityBadge;