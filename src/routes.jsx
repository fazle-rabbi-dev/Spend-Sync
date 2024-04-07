import { createBrowserRouter } from "react-router-dom";
import {  RootLayout, AuthLayout, PrivateLayout } from "@/components";
import { 
  Home, 
  About, 
  PrivacyPolicy, 
  NotFound,
  SignInPage,
  SignUpPage,
  Dashboard,
  Expenses,
  Trash,
  Settings
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignInPage />
      },
      {
        path: "/sign-up",
        element: <SignUpPage />
      }
    ]
  },
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
        {
          path: "/dashboard",
          element: <Dashboard />
        },
        {
          path: "/expenses",
          element: <Expenses />
        },
        {
          path: "/trash",
          element: <Trash />
        },
        {
          path: "/settings",
          element: <Settings />
        },
      ]
  }
]);

export default router;
