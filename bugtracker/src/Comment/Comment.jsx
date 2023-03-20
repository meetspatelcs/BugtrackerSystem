import React, { useEffect, useRef } from 'react';
import { useUser } from '../UserProvider/UserProvider';
import jwt_decode from "jwt-decode";

const Comment = (props) => {
    const user = useUser();
    const decodedjwt = jwt_decode(user.jwt);
    const {id, createdDate, createdBy, text, emitEditComment, emitDeleteComment} = props;

    function validateUser(){
        if(decodedjwt.sub === createdBy.username)
            return "end";
        else
            return "start";
    }

    const msgEndRef = useRef(null);

    const scrollToBottom = () =>{
        msgEndRef.current?.scrollIntoView({bhavior: "smooth"});
    }

    useEffect(() =>{
        scrollToBottom()
    }, [props]);
    
    return (
        <div className='d-flex' style={{justifyContent: validateUser()}}>
            <div className='comment-bubble'>
            <div className='d-flex gap-5' style={{fontWeight:"bold"}}>
            <div>{`${createdBy.user.firstname} ${createdBy.user.lastname}`}</div>{(validateUser() === "end") ? 
            <>
            <div onClick={() => emitEditComment(id)} style={{cursor: "pointer", color: "blue"}}>Edit</div>
            <div onClick={() => emitDeleteComment(id)} style={{cursor: "pointer", color: "red"}}>Delete</div>
            </> :<></>} 
            
            <br/></div>

            <div>{text}</div>
            {/* displays the most recent comment */}
            <div ref={msgEndRef}/> 
        </div>
        </div>
        
    );
};

export default Comment;