import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Comment from '../Comment/Comment';
import requestToPath from '../Services/fetchService';
import { useUser } from '../UserProvider/UserProvider';

const CommentContainer = (props) => {
    const {projectId} = props;
    const user = useUser();

    const emptyComment = {id: null, text: '', project: projectId != null ? parseInt(projectId):null, user: user.jwt};
    const [comment, setComment] = useState(emptyComment);
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        requestToPath(`/api/comments?project=${projectId}`, "GET", user.jwt, null)
        .then((commentsData) =>{
            setComments(commentsData);
        });
    },[]);

    function handleEditComment(commentId){
        const i = comments.findIndex((comment) => comment.id === commentId);
        const commentCopy = {
         id: comments[i].id, text: comments[i].text, project: projectId != null ? parseInt(projectId):null, user: user.jwt
        }
         setComment(commentCopy);
     }
 
     function handleDeleteComment(commentId){
         //TODO: send DELETE request to server
     }

    function updateComment(value){
        const commentCopy = {...comment}
        commentCopy.text = value;
        setComment(commentCopy);
    }

    function submitComment(commentData){
        if(comment.id){
            requestToPath(`/api/comments/${comment.id}`, "PUT", user.jwt, comment)
            .then((d) => {
                const commentsCopy = [...comments];
                const i = commentsCopy.findIndex((comment) => comment.id === d.id);
                commentsCopy[i] = d;
                setComments(commentsCopy);
                setComment(emptyComment);
            })
        }
        else{
            requestToPath(`/api/comments`, "POST", user.jwt, comment)
            .then((d) =>{
                const commentsCopy = [...comments];
                commentsCopy.push(d);
    
                setComments(commentsCopy);
                setComment(emptyComment);
            })
        }
    }

    return (
        <>
            <div className='container comment-wrapper mt-5'>
                <h2 className='ms-3 mb-3 px-2' style={{margin:"-1.2em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Comments</h2>
                    <div style={{ height:"22vh", overflow:"auto"}}>
                        {comments.map((cmt) => (
                            <Comment key={cmt.id} createdDate = {cmt.createdDate} createdBy = {cmt.createdBy} text = {cmt.text} emitDeleteComment={handleDeleteComment} emitEditComment={handleEditComment} id={cmt.id}/>))}
                    </div>
                    <div className='d-flex align-items-center'>
                        <textarea style={{width:"85%", borderRadius:"0.25em", resize:"none", backgroundColor: "#f8f8f8"}} onChange={(e) => updateComment(e.target.value)} value={comment.text}></textarea>
                        <Button className='ms-4' onClick={() => {submitComment();}}>Post Comment</Button>
                    </div>
            </div>
        </>
    );
};

export default CommentContainer;