import React, { useEffect, useState } from "react";
import './App.css';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useLocalState } from "./Util/useLocalStorage";

import Home from "./Auth/Home";
import Login from "./Auth/LoginCompo";
import Signup from "./Auth/SignupCompo";
// import Dashboard from "./Dashboard/DashboardCompo";
import DevDashboard from "./DevDashboard/DevDashboardCompo";
import LeadDashboard from "./LeadDashboard/LeadDashboardCompo";
import PrivateRoute from "./Auth/PrivateRoute";
import TicketView from "./TicketView/TicketView";
// import ProjectView from "./ProjectView/ProjectView";
import DevProjectView from "./DevProjectView/DevProjectView";
import LeadProjectView from "./LeadProjectView/LeadProjectView";
import MyTickets from "./MyTickets/MyTickets";
import LeadProjectTickets from "./ProjectTickets/LeadProjectTickets";

// Admin Section
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import AllProjects from "./AdminProjects/AllProjects";
import ManageEmployee from "./AdminManageEmployee/ManageEmployee";
import EmployeeView from "./AdminManageEmployee/EmployeeView";
import {useUser} from "./UserProvider/UserProvider";

// password
import ChangePass from "./Security/ChangePass";

function App() {
const user = useUser();
// const [authVal, setAuthVal] = useState("");
// const [jwt, setJwt] = useLocalState("", "jwt");
const [roles, setRoles] = useState([]);

useEffect(() => {
  setRoles(getRolesFromJWT());
}, [user.jwt]);

function getRolesFromJWT(){
  if(user.jwt){

    const decodedJwt = jwt_decode(user.jwt);
    //authorities
    return decodedJwt.authorities;
  }
  return [];
}

  return (
    
      <Router>
        <Routes>
        <Route path="/" exact element={<Home/>} />
          <Route path='/login' exact element={<Login/>} />
          <Route path="/signup"  element={<Signup />} />
          <Route path="/dashboard" element={roles.find((role)=> role === 'ROLE_LEAD') ? (<PrivateRoute><LeadDashboard /></PrivateRoute>) : 
          roles.find((role) => role === 'ROLE_USER') ? (<PrivateRoute> <DevDashboard /> </PrivateRoute>) : 
          <PrivateRoute><AdminDashboard/></PrivateRoute>} />

          {/* <Route path="/projects/:id" element={<PrivateRoute><ProjectView/></PrivateRoute>} /> */}
          <Route path="/projects/:projectId" element={roles.find((role)=> (role === 'ROLE_LEAD' || (role === 'ROLE_ADMIN'))) ? (<PrivateRoute><LeadProjectView/></PrivateRoute>) : (<PrivateRoute><DevProjectView/></PrivateRoute>)} />
          <Route path="/projects/:projectId/tickets/:ticketId" element={<PrivateRoute><TicketView/></PrivateRoute>}/>
          <Route path="/myTickets" element={<PrivateRoute><MyTickets/></PrivateRoute>} />
          {/* do not show the bottom path to user role */}
          <Route path="/projects/:projectId/projectTickets" element={ roles.find((role)=> (role ==='ROLE_LEAD') || (role === 'ROLE_ADMIN')) ? (<PrivateRoute><LeadProjectTickets/></PrivateRoute>) : (<></>)} />
        
          {/* Admin Section */}
          <Route path="/EmployeeProjects" element={roles.find((role) => role === 'ROLE_ADMIN') ? (<PrivateRoute><AllProjects/></PrivateRoute>) : (<></>)} />
          <Route path="/ManageEmployee" element={roles.find((role) => role === 'ROLE_ADMIN') ? (<PrivateRoute><ManageEmployee/></PrivateRoute>) : (<></>)}  />
          <Route path="/employees/:userId" element={roles.find((role)=> role === 'ROLE_ADMIN') ? (<PrivateRoute><EmployeeView/></PrivateRoute>) : (<></>)}  />

          {/* Security */}
         <Route path="/changePassword" element={<PrivateRoute><ChangePass/></PrivateRoute>} />
        
        </Routes>
      </Router>
  );
}

export default App;