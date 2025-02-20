import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../pages/LoginFormPage";
import SignupFormPage from "../pages/SignupFormPage";
import HomePage from "../components/HomePage/HomePage";
import Layout from "./Layout";
import AgencyPage from "../components/AgencyPage";
import Insights from "../components/Insights";
import AboutUsPage from "../pages/AboutUsPage";
import EventsPage from "../pages/Events/EventsPage";
import EventDetailsPage from "../pages/Events/EventDetailsPage";
import InsightsPage from "../pages/InsightsPage";
import LandingPage from "../pages/LandingPage";
import UserDashboardPage from "../components/UserDashboard/UserDashboard";
import AdminDashboardPage from "../components/AdminDashboard/AdminDashboard";




export const router = createBrowserRouter([
  {
    element: <Layout />, // Layout includes the Navigation component
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/landingpage",
        element: <LandingPage />,
        // element: <LandingPageHeroSection />
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
        element: <AgencyPage />,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/public",
        element: <EventsPage />,
      },
      // {
      //   path: "/events",
      //   element: <EventsPage />,
      // },
      {
        path: "/events/:id",
        element: <EventDetailsPage />,
      },
      {
        path: "/agencies",
        element: <AgencyPage />,
      },
      {
        path: "/metrics",
        element: <InsightsPage />,
      },
      {
        path: "/dashboard",
        element: <UserDashboardPage />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboardPage />,
      },
    ],
  },
]);
