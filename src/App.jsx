// src/App.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Splash from "./screens/Splash";
import Onboarding from "./screens/Onboarding";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ForgotPassword from "./screens/ForgotPassword";

import Dashboard from "./screens/Dashboard";
import TaskList from "./screens/TaskList";
import TaskDetails from "./screens/TaskDetails";
import CreateTask from "./screens/CreateTask";
import EditTask from "./screens/EditTask";

import Search from "./screens/Search";
import Filter from "./screens/Filter";
import Calendar from "./screens/Calendar";

import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

export default function App() {
  return (
    <Routes>

      {/* Public (no auth) */}
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Auth screens — agar logged in hai to /dashboard bhej do */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

      {/* Protected screens */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
      <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />

      <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path="/filter" element={<ProtectedRoute><Filter /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />

      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

    </Routes>
  );
}