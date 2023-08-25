import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import AppointmentCreate from './Components/AppointmentCreate/AppointmentCreate';
import AppointmentList from './Components/AppointmentsList/AppointmentsList';
import AppointmentEdit from './Components/AppointmentEdit/AppointmentEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';


import './App.css';


function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointment/create" element={<AppointmentCreate />} />
        <Route path="/appointments/edit/:id" element={<AppointmentEdit />} />
        <Route path="/appointments" element={<AppointmentList />} /> 

        {/* Add more routes here */}
      </Routes>
   
  </BrowserRouter>
  );
}

export default App;
