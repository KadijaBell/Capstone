import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import HomePage from "../components/HomePage/HomePage";
import Layout from "./Layout";
import AgencyPage from "../components/AgencyPage"; // Adjust the path as necessary
import Insights from "../components/Insights";



export const router = createBrowserRouter([
  {
    element: <Layout />, // Layout includes the Navigation component
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/agency-page",
        element: <AgencyPage />,
      },
      {
        path: "/insights",
        element: <Insights />,
      },
      {
        path: "/forum",
        element: <AgencyPage />, // Example for Forum page
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
