import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './signup.css'

const SignUp = () => {
  const history = useNavigate()
  const [inputs,setinputs] = useState({
    email: "",
    username: "",
    password: "",
  })
  const change = (e) =>{
    const {name,value} = e.target
    setinputs({...inputs,[name]:value})
  }
  const submit = async(e) => {

    e.preventDefault()

    await axios
    .post(`${window.location.origin}/api/v1/signup`,inputs)
    .then((res) => {
      if(res.data.message === "User already exist")
      toast.error(res.data.message)
      else {
        toast.success(res.data.message)
        setinputs({
          email: "",
        username: "",
        password: "",
        })
        history("/signin")
      }
     
    })
    
  }
  return (
    <div className='signup'>
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 d-flex justify-content-center align-items-center column">
            <div className='d-flex flex-column w-100 p-3'>
              <input className='p-2 my-3 input-signup' name='email' type="email" placeholder='Enter your email' onChange={change} value={inputs.email} />
              <input className='p-2 my-3 input-signup' name='username' type="username" placeholder='Enter your Username ' onChange={change} value={inputs.username}/>
              <input className='p-2 my-3 input-signup' name='password' type="password" placeholder='Enter your password' onChange={change} value={inputs.password}/>
              <button className="btn-signup p-2" onClick={submit}>Sign Up</button>
              <h6 className='text-center py-2 link'>Already have an account? <Link to='/signin'>Signin</Link></h6>
            </div>
          </div>
          <div className=" d-none col-lg-4 d-lg-flex justify-content-center align-items-center  column ">
            <h1 className="text-center sign-up-heading ">
              Sign <br /> Up
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp