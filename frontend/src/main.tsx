import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import Schedule from './Schedule.tsx'
import Reservation from './Reservation.tsx'
import PetReserve from './PetReserve.tsx'
import Search from './Search.tsx'
import ResRecords from './ResRecords.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="Reservation" element={<Reservation/>}/>
        <Route path="Schedule" element={<Schedule/>}/>
        <Route path="PetReserve" element={<PetReserve/>}/>
        <Route path="Search" element={<Search/>}/>
        <Route path="ResRecords" element={<ResRecords/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
