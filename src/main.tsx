import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App'
import Auth from './pages/Auth'
import Analytics from './pages/Analytics'
import Laws from './pages/Laws'
import RequireAuth from './components/RequireAuth'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LawyerPanel from "./components/lawyer-panel/LawyerPanel";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <RequireAuth><Analytics /></RequireAuth> },
      { path: "laws", element: <RequireAuth><Laws /></RequireAuth> },
      { path: "lawyers", element: <RequireAuth><LawyerPanel /></RequireAuth> },
    ],
  },
]);

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
