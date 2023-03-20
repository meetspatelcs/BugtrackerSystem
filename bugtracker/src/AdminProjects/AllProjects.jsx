import React, { useEffect, useState } from 'react';
import {  Container } from 'react-bootstrap';
import DashboardModals from '../Modals/DashboardModals';
import NavBar from '../NavBar/NavBar';
import requestToPath from '../Services/fetchService';
import ProjectDashboardTable from '../Tables/ProjectDashboardTable';
import { useUser } from '../UserProvider/UserProvider';

const AllProjects = () => {
    const user = useUser();
    const[projects, setProjects] = useState(null);
    const[show, setShow] = useState(false);
    const[selectedProject, setSelectedProject] = useState({selectedId:'', selectedTitle:'', selectedProjectDesc:''});

    // gets all projects in the database
    useEffect(()=> {
        requestToPath("api/projects/admin/projectsAuth", "GET", user.jwt)
            .then((projectsData) => {
                setProjects(projectsData);
            }); 
    }, []);

    function handleClose(){ setShow(false); }
    function handleShow(){ setShow(true); }
    function handleClick(project){
        setSelectedProject({ selectedId: project.id, selectedTitle: project.projectTitle, selectedProjectDesc: project.projectDescription })
    }

    function handleDeleteProject(myProjectId){
        requestToPath(`api/projects/${myProjectId}`, "DELETE", user.jwt)
        .then((msg) =>{
            const projectsCopy = [...projects];
            const i = projectsCopy.findIndex((p) => p.id === myProjectId);
            projectsCopy.splice(i, 1);
            setProjects(projectsCopy);
            window.location.reload();
        });
    }

    return (
        <div className='d-flex' style={{width:"100vw", height:"100vh", margin: "0", padding: "0" }}>
            <NavBar/>

            <div className='d-block' style={{paddingLeft:"10%", marginLeft:"auto", marginRight:"auto"}}>
             <h1 className='text-center'>Employee Projects</h1>
            <Container className='project-wrapper mt-5' >
            <h2 className='ms-3 mb-3 px-2' style={{margin:"-1.7em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Projects</h2>
                {
                    projects ? <ProjectDashboardTable tableProjects = {projects} emitHandleClick={handleClick} emitHandleShow={handleShow} emitHandleDeleteProject={handleDeleteProject} /> : <></>
                }
            </Container>
            </div>

            <DashboardModals show={show} emitHandleClose={handleClose} selectedProject={selectedProject}/>
        </div>
    );
};

export default AllProjects;