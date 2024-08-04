import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Profile from './components/Profile'
import NavBar from './components/NavBar'
import UpdateProfile from './components/UpdateProfile'
import RepairReq from './components/RepairReq'
import Login1 from './components/Login1'
import LandPage from './components/LandPage'
import SignUp1 from './components/SignUp1'
import Dashboard1 from './components/Dashboard1'
import RaiseIssue1 from './components/RaiseIssue1'
import PredictPrize1 from './components/PredictPrize1'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'


function App() {

  return (
    <>
    {/* <Home/> */}
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<LandPage/>}/>
        <Route path='/home' element={<LandPage/>}/>
        <Route path='/services' element={<Services/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/dashboard' element={<Dashboard1/>}></Route>
        <Route path="/signup" element={<SignUp1/>}></Route>
        <Route path="/signin" element={<Login1/>}></Route>
        <Route path='/predict' element={<PredictPrize1/>}></Route>
        <Route path='/raise' element={<RaiseIssue1/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/navbar' element={<NavBar/>}></Route>
        <Route path='/update_profile' element={<UpdateProfile/>}></Route>
        <Route path='/repairreq' element={<RepairReq/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
