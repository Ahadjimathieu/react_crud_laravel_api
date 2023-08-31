import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import 'bootstrap/dist/css/bootstrap.min.css'
import StudentList from '../pages/students/Student'
import AddStudent from '../pages/students/AddStudent'
import EditStudent from '../pages/students/EditStudent'


const  MyRouter = () => {
  return (
    <Routes>
        <Route path='/'  element={<Home/>} />
        <Route path='/about'  element={<About/>} />
        <Route path='/contact'  element={<Contact />} />
        <Route path='/students'  element={<StudentList />} />
        <Route path='/student/create'  element={<AddStudent />} />
        <Route path='/student/:id/edit'  element={<EditStudent />} />
    </Routes>
  )
}

export default MyRouter
