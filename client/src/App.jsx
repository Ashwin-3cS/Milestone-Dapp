import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import User from './pages/user/User';
import Creator from './pages/creator/Creator';


import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/user" element={<User/>}></Route>
          <Route path="/creator" element={<Creator/>}></Route>
        </Routes>
        <Toaster />
      </Router>
    </div>
  )
}

export default App
