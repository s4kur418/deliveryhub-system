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

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* SIGNUP */}
        <Route
          path="/signup"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : user.role === "rider" ? (
                <Navigate to="/rider/dashboard" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <SignupForm />
            )
          }
        />

        {/* LOGIN PAGE */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : user.role === "rider" ? (
                <Navigate to="/rider/dashboard" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <LoginForm setUser={setUser} />
            )
          }
        />

        {/* USER DASHBOARD */}
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

        {/* RIDER DASHBOARD */}
        <Route
          path="/rider/dashboard"
          element={
            user && user.role === "rider" ? (
              <RiderDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
