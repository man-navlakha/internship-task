const USERS_KEY = 'users';
const AUTH_KEY = 'auth';

export function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

export function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser({ name, email, password }) {
    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Email already registered');
    }
    const id = Date.now().toString();
    const user = { id, name, email, password };
    users.push(user);
    saveUsers(users);
    return user;
}

export function loginUser({ email, password }) {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
    }
    const token = 'fake-jwt-' + Date.now();
    const auth = { user, token };
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    return auth;
}

export function getAuth() {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
}

export function logoutUser() {
    localStorage.removeItem(AUTH_KEY);
}

export function updateUserProfile(updated) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx === -1) throw new Error('User not found');
    users[idx] = { ...users[idx], ...updated };
    saveUsers(users);

    const auth = getAuth();
    if (auth && auth.user.id === updated.id) {
        auth.user = users[idx];
        localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    }
    return users[idx];
}
