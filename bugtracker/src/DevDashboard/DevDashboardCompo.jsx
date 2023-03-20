import React, { useEffect, useState } from 'react';
import requestToPath from '../Services/fetchService';
import {  Container } from 'react-bootstrap';
import { useUser } from '../UserProvider/UserProvider';
import NavBar from '../NavBar/NavBar';
import ProjectDashboardTable from '../Tables/ProjectDashboardTable';
import DashboardModals from '../Modals/DashboardModals';

const DevDashboardCompo = () => {
    const user = useUser();
    const[projects, setProjects] = useState(null);
    const[show, setShow] = useState(false);
    const[selectedProject, setSelectedProject] = useState({selectedId:'', selectedTitle:'', selectedProjectDesc:''});

    // get the projects assigned to user
    useEffect(()=> {
        requestToPath("api/projects", "GET", user.jwt)
            .then((projectsData) => {
                setProjects(projectsData);
            }); 
    }, []);

    function handleClose(){ setShow(false); }
    function handleShow(){ setShow(true); }
    function handleClick(project){
        setSelectedProject({ selectedId: project.id, selectedTitle: project.projectTitle, selectedProjectDesc: project.projectDescription })
    }
    
    return (            
        <div className='d-flex' style={{width:"100vw", height:"100vh", margin: "0", padding: "0" }} >
                <NavBar/>
                <div className='d-block' style={{paddingLeft:"10%", marginLeft:"auto", marginRight:"auto"}}>

                <Container className='project-wrapper mt-5 '>
                    <h2 className='ms-3 mb-4 px-2' style={{margin:"-1.7em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Projects</h2>
                
                    {
                        projects ? <ProjectDashboardTable tableProjects = {projects} emitHandleClick={handleClick} emitHandleShow={handleShow} /> : <></>
                    }

                </Container>
                </div>

                <DashboardModals show={show} emitHandleClose={handleClose} selectedProject={selectedProject}/>    
        </div>
    );
};

export default DevDashboardCompo;