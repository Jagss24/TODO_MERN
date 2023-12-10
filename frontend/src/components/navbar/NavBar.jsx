import React from 'react'
import { GiWhiteBook } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import { authActions } from '../../store';
import './Navbar.css'
const NavBar = () => {
    const dispatch = useDispatch()
    const isLoggedIn =  useSelector((state) => state.isLoggedIn)
    const logout = () => {
        sessionStorage.removeItem("id")
        dispatch(authActions.logout())
    }
    return (
        <nav className="navbar navbar-expand-lg ">
            <div className="container">
                <Link className="navbar-brand" to="#"> <b className='navbar-brand'> <GiWhiteBook />todo</b></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2 text-center">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item mx-2 text-center">
                            <Link className="nav-link active" aria-current="page" to="/about">About us</Link>
                        </li>
                        <li className="nav-item mx-2 text-center">
                            <Link className="nav-link active" aria-current="page" to="/todo">TODO</Link>
                        </li>
                        {!isLoggedIn && <>
                        <li className="nav-item mx-2 mb-2 text-center">
                            <Link className="nav-link active btn-nav" aria-current="page" to="/signup">Sign up</Link>
                        </li>
                        <li className="nav-item mx-2 text-center">
                            <Link className="nav-link active btn-nav" aria-current="page" to="/signin">Sign in</Link>
                        </li>
                        </>}
                       {isLoggedIn &&
                        <li className="nav-item mx-2 text-center">
                        <Link className="nav-link active btn-nav" aria-current="page" to="/" onClick={logout}>Log out</Link> 
                    </li>}
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default NavBar