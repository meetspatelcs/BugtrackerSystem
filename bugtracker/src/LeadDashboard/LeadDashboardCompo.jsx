import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import requestToPath from '../Services/fetchService';
import { Button, Container } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import { useUser } from '../UserProvider/UserProvider';
import ProjectDashboardTable from '../Tables/ProjectDashboardTable';
import DashboardModals from '../Modals/DashboardModals';

const LeadDashboardCompo = () => {
    const user = useUser();
    const[projects, setProjects] = useState([]); // was null instead []
    const[show, setShow] = useState(false);
    const[selectedProject, setSelectedProject] = useState({ selectedId:'', selectedTitle:'', selectedProjectDesc:''});
    const navigate = useNavigate();

    // gets the project assigned to user
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

    function createProject(){
        requestToPath("api/projects", "POST", user.jwt)
        .then((project) => {
            navigate(`/projects/${project.id}`);
        });
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
        <h1 className='text-center'>Dashboard</h1>
            <Container className='project-wrapper mt-5' >
            <h2 className='ms-3 mb-3 px-2' style={{margin:"-1.7em", backgroundColor:"white", width:"min-content", whiteSpace: "nowrap"}}>Projects</h2>
            {/* container only for button */}
            <div className='d-flex justify-content-end mb-4' style={{marginTop:"-3.5em" }}>
                <Button size="lg" variant="primary" className='me-3 px-2' style={{ width:"min-content", whiteSpace:"nowrap"}} onClick={() => createProject()}>New Project</Button>
            </div>
                {
                    projects ? <ProjectDashboardTable tableProjects = {projects} emitHandleClick={handleClick} emitHandleShow={handleShow}  emitHandleDeleteProject={handleDeleteProject} /> : <></>
                }
            </Container>
            </div>

            <DashboardModals show={show} emitHandleClose={handleClose} selectedProject={selectedProject}/>
        </div>
    );
};

export default LeadDashboardCompo;