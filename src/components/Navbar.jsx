import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, logoutUser } from '../utils/authLocal';

/**
 * Global Navigation Component
 * * Displays different links based on authentication state:
 * - Guest: Login / Signup
 * - Authenticated: Profile / Logout
 */
const Navbar = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    function handleLogout() {
        logoutUser();
        navigate('/auth/login');
    }

    return (
        <nav className="navbar bg-light px-5 d-flex justify-content-between">
            {/* Logo links to home */}
            <Link to="/" className="text-decoration-none text-dark">
                <h1>Task</h1>
            </Link>

            <div className="navbar-nav d-flex flex-row gap-3">
                {/* Conditional Rendering based on Auth Token */}
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