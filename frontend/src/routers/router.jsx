import { createBrowserRouter } from "react-router-dom";

import AddProducts from "../pages/AdminPages/AddProducts";
import MainPage from "../pages/AdminPages/MainPage";
import PosterReviews from "../pages/AdminPages/PosterReviews";
import Products from "../pages/AdminPages/Products";

import Home from "../pages/UserPage/Home";
import Poster from "../pages/UserPage/Poster";
import UserMainPage from "../pages/UserPage/UserMainPage";

import Login from "../pages/UserPage/Auth/Login";
import Signup from "../pages/UserPage/Auth/Signup";

import ProtectedRoute from "../routers/ProtectedRoute";

export const router = createBrowserRouter([
    // =========================
    // PUBLIC AUTH ROUTES
    // =========================
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },

    // =========================
    // ADMIN ROUTES - NO PROTECTION
    // =========================
    {
        path: "/admin",
        element: <MainPage />,
        children: [
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "addproduct",
                element: <AddProducts />,
            },
            {
                path: "posterReview",
                element: <PosterReviews />,
            },
        ],
    },

    // =========================
    // USER ROUTES - PROTECTED
    // =========================
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <UserMainPage />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: "poster",
                        element: <Poster />,
                    },
                ],
            },
        ],
    },
]);