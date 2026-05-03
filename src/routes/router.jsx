import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        )
    }
])