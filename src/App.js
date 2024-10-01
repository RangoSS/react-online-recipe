import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Navbar from './components/Navbar'
import Register from './components/pages/Register'
import Login from './components/Login'
import MainResipe from './components/MainResipe'
import Register2 from './components/pages/Register2'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register2/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/recipe' element={<MainResipe/>}/>
      
      </Routes>
    </Router>
  )
}

export default App
