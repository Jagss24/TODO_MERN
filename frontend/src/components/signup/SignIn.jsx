import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './signup.css'
import {useDispatch} from 'react-redux'
import { authActions } from '../../store';

const SignIn = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const [inputs,setinputs] = useState({   
        email: "",
        password: "",
      })
      const change = (e) =>{
        const {name,value} = e.target
        setinputs({...inputs,[name]:value})
      }
      const submit = async(e) => {
        e.preventDefault()
        await axios
        .post(`${window.location.origin}/api/v1/signin`,inputs)
        .then((res) => {
          if(res.data.message === "Please signup first")
          toast.error(res.data.message)
        else if(res.data.message === "Password is not correct")
        toast.error(res.data.message)
    else {
        sessionStorage.setItem("id",res.data.others._id)
        dispatch(authActions.login())
        setinputs({
            email: "",
          password: "",
          })
          history("/todo")
    }  
        })
    }
    return (
        <div className='signup'>
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 d-lg-flex d-none justify-content-center align-items-center  column ">
                        <h1 className="text-center sign-up-heading ">
                            Sign <br /> In
                        </h1>
                    </div>
                    <div className="col-lg-8 d-flex justify-content-center align-items-center  column">
                        <div className='d-flex flex-column w-100 p-3'>
                            <input className='p-2 my-3 input-signup' name='email' type="email" placeholder='Enter your email '  onChange={change} value={inputs.email} />
                            <input className='p-2 my-3 input-signup' name='password' type="password" placeholder='Enter your password' onChange={change} value={inputs.password} />
                            <button className="btn-signup p-2" onClick={submit}>Sign In</button>
                            <h6 className='text-center py-2 link'>Don't have an account? <Link to='/signup'>Sign up</Link></h6>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignIn