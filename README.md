
# React Account Management App  (PR: REACTIIP01002)
A simple React application that allows users to **sign up, log in, view, and edit their account information**.  

## 🚀 Features
- Register a new user  
- Login with saved credentials  
- Protected route for Profile page  
- View & edit account details  
- Logout  
- Local storage–based authentication (no backend required)  
- Basic Bootstrap UI  

## 🛠 Tech Stack
- React (Vite)
- React Router
- Bootstrap
- LocalStorage (for mock authentication)
- JavaScript

---

# 📂 Project Structure
```

src/
├── components/
│    └── Navbar.jsx
│    └── ProtectedRoute.jsx
├── pages/
│    └── Login.jsx
│    └── Signup.jsx
│    └── Profile.jsx
├── utils/
│    └── authLocal.js
├── App.jsx
├── main.jsx

````

---

# 🔐 Authentication Logic
This project uses **localStorage** to store:
- Registered users → under `"users"`
- Current authenticated user & token → under `"auth"`

Example stored session:
```json
{
  "user": { "id": "12345", "name": "Man", "email": "man@navlakha.com" },
  "token": "fake-jwt-12345"
}
````
---

# ▶️ Getting Started

### 1. Clone the Repo

```
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Install Dependencies

```
npm install
```

### 3. Run the App

```
npm run dev
```

Open the app at:

```
http://localhost:5173/
```

---

# 🔑 Default Routes

| Route          | Description                     |
| -------------- | ------------------------------- |
| `/auth/signup` | User registration               |
| `/auth/login`  | User login                      |
| `/profile`     | View / edit account (protected) |
| `/`            | Home Page                       |

Protected routes require the user to be logged in.
If a non-logged-in user tries to access `/profile`, they will be redirected to `/auth/login`.

---

# 👨‍💻 Author

**Man Navlakha**

