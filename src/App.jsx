
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { getAuth } from './utils/authLocal';


function App() {

  const auth = getAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<div className="container mt-5">404 — Page not found</div>} />
        <Route path="/" element={<div className="container mt-5"><h4>Welcome , {!auth?.token ? ("use Register or Login") : auth?.user.name}</h4></div>} />
        <Route path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/auth/signup' element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App
