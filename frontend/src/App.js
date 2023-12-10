import React, { useEffect } from 'react'
import Home from './components/home/Home'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import About from './components/about/About'
import SignUp from './components/signup/SignUp'
import SignIn from './components/signup/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Todo from './components/todo/Todo'
import {useDispatch} from 'react-redux'
import { authActions } from './store';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const id = sessionStorage.getItem("id")
    if(id)
    dispatch(authActions.login())
  })
  
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
        <Footer />
      </Router>

    </div>
  )
}

export default App