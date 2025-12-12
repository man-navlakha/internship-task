import React, { useEffect, useState } from 'react';
import { getAuth, updateUserProfile, logoutUser } from '../utils/authLocal';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const initialAuth = getAuth();
    const [auth, setAuth] = useState(initialAuth);
    const [user, setUser] = useState(auth?.user || null);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: '', email: '' });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const current = getAuth();
        setAuth(current);
        setUser(current?.user || null);
        if (current?.user) setForm({ name: current.user.name, email: current.user.email });
    }, []);

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function validateForm() {
        if (!form.name || !form.name.trim()) return 'Name is required';
        if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) return 'Enter a valid email';
        return null;
    }

    async function handleSave() {
        setMessage(null);
        setError(null);

        const v = validateForm();
        if (v) { setError(v); return; }

        if (!user || !user.id) {
            setError('No user to update');
            return;
        }

        setSaving(true);
        try {
            const updatedUser = updateUserProfile({
                id: user.id,
                name: form.name.trim(),
                email: form.email.trim()
            });

            const freshAuth = getAuth();
            setAuth(freshAuth);
            setUser(updatedUser);
            setForm({ name: updatedUser.name, email: updatedUser.email });
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
        setAuth(null);
        setUser(null);
        navigate('/auth/login');
    }

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
