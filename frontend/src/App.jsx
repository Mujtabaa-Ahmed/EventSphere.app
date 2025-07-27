import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminHome from './Pages/Admin/Home';
import AllUsers from './Pages/Admin/AllUsers';
import AddEvent from './Pages/Admin/AddEvent';
import AllEvent from './Pages/Admin/AllEvent';
import ExibiterHome from './Pages/Exhibitor/Home'
import AllAssignedbooths from './Pages/Admin/AllAssignedbooths';
import AllExhibitor from './Pages/Admin/RegistrationForExibiter';
import AsignAbooth from './Pages/Admin/AssignBooth';
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/Signup';
import AllSession from './Pages/Admin/Allsessions';
import AddSession from './Pages/Admin/Addsession';
import Application from './Pages/Admin/Application';
import ExhibiterExpo from './Pages/Exhibitor/ExhibiterExpo';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/addevent" element={<AddEvent />} />
        <Route path="/admin/allevent" element={<AllEvent />} />
        <Route path="/admin/booths" element={<AllAssignedbooths />} />
        <Route path="/admin/registration" element={<AllExhibitor />} />
        <Route path="/admin/asignbooth" element={<AsignAbooth />} />
        <Route path="/admin/allsession" element={<AllSession />} />
        <Route path="/admin/addsession" element={<AddSession />} />
        <Route path="/admin/application" element={<Application />} />







        {/* Exhibiter Routes */}
        <Route path="/exibiter" element={<ExibiterHome />} />
        <Route path="/exibiter/expo" element={< ExhibiterExpo/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
