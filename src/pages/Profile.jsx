import React, { useEffect, useState } from 'react';
import { getAuth, updateUserProfile, logoutUser } from '../utils/authLocal';
import { useNavigate } from 'react-router-dom';

/**
 * User Profile & Account Management
 * * Allows users to view and update their personal details.
 * Changes are persisted to LocalStorage via the mock auth utility.
 */
export default function Profile() {
    const navigate = useNavigate();
    const initialAuth = getAuth();

    // State management for user data and UI modes
    const [auth, setAuth] = useState(initialAuth);
    const [user, setUser] = useState(auth?.user || null);
    const [editing, setEditing] = useState(false); // Toggles between View and Edit modes
    const [form, setForm] = useState({ name: '', email: '' });
    
    const [message, setMessage] = useState(null); // Success feedback
    const [error, setError] = useState(null);     // Error feedback
    const [saving, setSaving] = useState(false);

    // Sync state with local storage on mount to ensure fresh data
    useEffect(() => {
        const current = getAuth();
        setAuth(current);
        setUser(current?.user || null);
        if (current?.user) {
            setForm({ name: current.user.name, email: current.user.email });
        }
    }, []);

    // ... (handleChange and validateForm are self-explanatory)

    async function handleSave() {
        // ... (validation checks)

        setSaving(true);
        try {
            // Update the user in the mock database
            const updatedUser = updateUserProfile({
                id: user.id,
                name: form.name.trim(),
                email: form.email.trim()
            });

            // Update local state to reflect changes immediately
            const freshAuth = getAuth();
            setAuth(freshAuth);
            setUser(updatedUser);
            
            // UX: Switch back to view mode and show success message
            setEditing(false);
            setMessage('Profile updated successfully');
        } catch (err) {
            console.error('Profile update error:', err);
            setError(err.message || 'Update failed');
        } finally {
            setSaving(false);
        }
    }

    function handleLogout() {
        logoutUser();
        // Clear state and redirect immediately
        setAuth(null);
        setUser(null);
        navigate('/auth/login');
    }

    // Guard clause: Should technically be handled by ProtectedRoute, but good for safety.
    if (!user) {
        return <div className="container mt-5">No authenticated user found.</div>;
    }

    return (
        <div className="container mt-5" style={{ maxWidth: 640 }}>
            <h3>Account</h3>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!editing ? (
                <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button className="btn btn-secondary me-2" onClick={() => { setEditing(true); setMessage(null); setError(null); }}>Edit</button>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input name="name" value={form.name} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input name="email" value={form.email} onChange={handleChange} className="form-control" />
                    </div>
                    <button className="btn btn-primary me-2" onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button className="btn btn-secondary" onClick={() => { setEditing(false); setError(null); setMessage(null); }}>
                        Cancel
                    </button>
                </>
            )}
        </div>
    );
}
