// routes/router.js
import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Layout from "../Layout";
import Dashboard from "../Dashboard/Dashboard";
import Home from "../Dashboard/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import Hero from "../components/Hero";
import PublicRoute from "../components/PublicRoute";
import Perofile from "../Dashboard/Perofile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Hero />,
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )

      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <Signup />,
          </PublicRoute>
        )
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "settings",
        element: <h1>Settings</h1>,
      },
      {
        path: "profile",
        element: <Perofile />,
      },
    ],
  },
]);
