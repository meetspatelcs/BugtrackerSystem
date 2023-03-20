import React from 'react';
import { Badge } from 'react-bootstrap';


const StatusBadge = (props) => {
    const  {text} = props;

    function getBadgeColor(){
        if(text === "New")
            return "primary";
        else if(text === "Open")
            return "info";
        else if(text === "In-Progress")
            return "warning";
        else if(text === "Closed")
            return "danger";
        else if(text === "Resolved")
            return "success";
    }
    
    return (
        <Badge pill bg={getBadgeColor()} className='ms-5 mb-1 px-2'
        style={{margin:"-3.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap", fontSize:"1em"}}>
            {text}
        </Badge>
    );
};

export default StatusBadge;