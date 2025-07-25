import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import HomeLayout from './Layouts/HomeLayout'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'
import LogIn from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/courseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element = {<HomePage />} ></Route>
      <Route path='/about' element = {<AboutUs />}></Route>
      <Route path='/signup' element = {<SignUp />}></Route>
      <Route path='/login' element = {<LogIn />}></Route>
      <Route path='/courses' element = {<CourseList />}></Route>

      <Route path="*" element = {<NotFound />}></Route>
      <Route path="contact" element = {<Contact />}></Route>
      <Route path="denied" element = {<Denied />}></Route>
      <Route path="/course/description" element = {<CourseDescription />}></Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path='/course/create' element={<CreateCourse />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path='/user/profile' element={<Profile />} />
      </Route>

    </Routes>
    </>
  )
}

export default App
