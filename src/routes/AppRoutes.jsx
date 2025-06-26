import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Layout from "../layouts/Layout";
import AddComplaints from "../pages/complaints/AddComplaints";
import Complaints from "../pages/complaints/Complaints";
import Dashboard from "../pages/dashboard/Dashboard";
import Leaderboard from "../pages/leaderboard/Leaderboard";
import Register from "../pages/register/Register";
import Signin from "../pages/signin/Signin";

const AppRoutes = () => {
  const current_user = useSelector((state) => state?.auth?.current_user);

  return (
    <Routes>
      <Route
        path="/signin"
        element={
          <PublicRoute current_user={current_user}>
            <Signin />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute current_user={current_user}>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute current_user={current_user}>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-complaints"
        element={
          <ProtectedRoute current_user={current_user}>
            <Layout>
              <AddComplaints />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/complaints"
        element={
          <ProtectedRoute current_user={current_user}>
            <Layout>
              <Complaints />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute current_user={current_user}>
            <Layout>
              <Leaderboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
