/**
 * Main Application Component
 * * Defines the routing structure and global layout.
 * The Navbar is placed outside of Routes to ensure it persists across page views.
 */
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { getAuth } from './utils/authLocal';

function App() {
  // Retrieve current user state to display a personalized welcome message
  const auth = getAuth();

  return (
    <>
      <Navbar />
      <Routes>
        {/* Fallback route for unknown URLs */}
        <Route path="*" element={<div className="container mt-5">404 — Page not found</div>} />
        
        {/* Home Route */}
        <Route path="/" element={
          <div className="container mt-5">
            <h4>Welcome, {!auth?.token ? ("use Register or Login") : auth?.user.name}</h4>
          </div>
        } />

        {/* Protected Routes 
          Wrapped in <ProtectedRoute> to prevent unauthorized access.
        */}
        <Route path="/account" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Public Authentication Routes */}
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/auth/signup' element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App