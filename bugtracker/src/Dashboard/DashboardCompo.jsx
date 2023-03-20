import React, { useEffect, useState } from 'react';
import { useLocalState } from '../Util/useLocalStorage';
import {Link, useNavigate} from 'react-router-dom';
import requestToPath from '../Services/fetchService';
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';

const DashboardCompo = () => {
    
    const[jwt, setJwt] = useLocalState("", "jwt");
    const[projects, setProjects] = useState(null);
    const[show, setShow] = useState(false);
    const[selectedProject, setSelectedProject] = useState({ selectedId:'', selectedTitle:'', selectedProjectDesc:'', });
    const[user, setUser] = useState({}); 
    const navigate = useNavigate();

    function handleClose(){ setShow(false); }
    function handleShow(){ setShow(true); }

    useEffect(()=> {
        requestToPath("api/projects", "GET", jwt)
            .then((projectsData) => {
                setProjects(projectsData);
            }); 
    }, []);

    // will help to get the user details

    useEffect(() => {
        requestToPath("api/users/test", "GET", jwt)
        .then((myData) => {
            setUser(myData);
        })
    },[])

    function createProject(){
        requestToPath("api/projects", "POST", jwt)
        .then((project) => {
            navigate(`/projects/${project.id}`);
        });
    }

    function handleClick(project){
        setSelectedProject({ selectedId: project.id, selectedTitle: project.projectTitle, selectedProjectDesc: project.projectDescription })
    }
    
    return (            
        <div className='container mt-5'>
        <Row>
            <Col>
                <div className='d-flex justify-content-start' onClick={()=>{setJwt(null); navigate('/');}} style={{cursor: "pointer"}}>Logout</div>
            </Col>
        </Row>
            {/* container only for button */}
            <div className='container d-flex justify-content-end pe-4'>
                <Button size="lg" variant="outline-primary" onClick={() => createProject()}>New Project</Button>
            </div>

            <Container className='mt-4' >
            <h2 className='ms-3 mb-5'>Projects</h2>
                <Table responsive borderless hover size='sm' className='table-condensed' >
                    <thead className='text-center table-dark'>
                        <tr className='row ms-3 me-3'>
                            <th className='col-3 d-block text-truncate' >Title</th>
                            <th className='col-6 d-block text-truncate' >Description</th>
                            <th className='col-3 d-block ' ></th>
                        </tr>
                    </thead>
                    <tbody className='d-block ' style={{height:"39vh",  overflow:"auto"}}>
                    {projects ? projects.map((project) => (
                        <tr key={project.id} className='row ms-3 me-3' >
                            <td className='col-3 d-block text-truncate'>{project.projectTitle}</td>
                            <td className='col-6 d-block text-truncate'>{project.projectDescription}</td>
                            <td className='col-3 d-block'>
                            <Button className='m-1' variant="outline-info" onClick={()=>{ handleClick(project); handleShow();}}>View</Button> 
                            <Link to={`/projects/${project.id}`}><Button className='m-1' variant="outline-warning">Update</Button></Link>
                            <Button className='m-1' variant="outline-danger">Delete</Button>  
                            </td>
                        </tr>
                    )) : (<></>)}
                    </tbody>
                </Table>

            </Container>
            
            <Modal size='sm' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h1>Ticket {selectedProject.selectedId}</h1> </Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <h2 className='text-center mb-5'>{selectedProject.selectedTitle}</h2> 
                    <p className='mt-5'>{selectedProject.selectedProjectDesc}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DashboardCompo;