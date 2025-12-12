import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, logoutUser } from '../utils/authLocal';

const Navbar = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    function handleLogout() {
        logoutUser();
        navigate('/auth/login');
    }

    const goHome = () => {
        window.location.href = "/";
    };


    return (
        <nav className="navbar bg-light px-5 d-flex justify-content-between">

            <h1 onClick={goHome}>Task</h1>


            <div className="navbar-nav d-flex flex-row gap-3">
                {!auth?.token ? (
                    <>
                        <Link className="nav-link" to="/auth/signup">Signup</Link>
                        <Link className="nav-link" to="/auth/login">Login</Link>
                    </>
                ) : (
                    <>
                        <Link className="nav-link" to="/account">Profile</Link>
                        <button
                            className="btn btn-link nav-link p-0 text-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
