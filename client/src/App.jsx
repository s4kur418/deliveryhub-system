import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import RiderDashboard from './pages/RiderDashboard';
import LoginForm from './components/LoginForm';
import SignupForm  from './components/SignupForm';
import { authAPI } from './services/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const data = await authAPI.getSession();
      if (data.loggedIn) setUser(data.user);
      setLoading(false);
    };

    loadSession();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<LoginForm setUser={setUser} />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/dashboard' element={<UserDashboard />} />
        <Route path='/rider/dashboard' element={<RiderDashboard />} /> */}
        <Route path='/signup' element={user ? (
            user.role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/dashboard" />
            )
          ) : (
             <SignupForm />
          )} />
          
        <Route 
          path='/' element={user ? (
            user.role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/dashboard" />
            )
          ) : (
            <LoginForm setUser={setUser} />
          )} 
        />
          
        <Route
          path="/dashboard"
          element={
            user && user.role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard user={user}/>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
