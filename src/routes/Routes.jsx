import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import NotFound from "../components/NotFound";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/SignIn/Login";
import SignUp from "../pages/Register/SignUp"
import Products from "../pages/Products/ProductPage";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import AddProducts from "../pages/Dashboard/UserDashboard/AddProducts";
import Statistics from "../pages/Dashboard/AdminDashboard/Statistics";
import MyProduct from "../pages/Dashboard/UserDashboard/MyProduct";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import Profile from "../pages/Dashboard/Profile";
import DashboardLayout from "../layout/DashboardLayout";
import ManageCoupon from "../pages/Dashboard/AdminDashboard/ManageCoupon";
import ProductReviewQueue from "../pages/Dashboard/ModeratorDashboard/ProductReviewQueue";
import UpdateProducts from "../pages/Dashboard/UserDashboard/UpdateProducts";
import PostReview from "../pages/ProductDetails/PostReview";
import ProductReview from "../pages/ProductDetails/ProductReview";
import ReportedProduct from "../pages/Dashboard/ModeratorDashboard/ReportedProduct";
import Payment from "../pages/Dashboard/AdminDashboard/Payment/Payment";
import ProductPage from "../pages/Products/ProductPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: "products",
                element: <ProductPage />,
                loader: () => fetch(`${import.meta.env.VITE_API_URL}/productsCount`)
            }

            ,
            {
                path: "productDetails/:id",
                element: <PrivateRoute><ProductDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/product-details/${params.id}`)
            },


        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "/register",
        element: <SignUp />
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [

            {
                path: 'add-products',
                element: <AddProducts />
            },
            {
                path: 'my-products',
                element: <MyProduct />
            },
            {
                path: 'manage-users',
                element: <ManageUsers />
            },
            {
                path: 'manage-coupons',
                element: <ManageCoupon />
            },
            {
                path: 'statistics',
                element: <Statistics />
            },
            {
                path: 'product-reviewQueue',
                element: <ProductReviewQueue />
            },
            {
                path: 'reported-content',
                element: <ReportedProduct />
            },
            {
                path: 'profile',
                element: <Profile />
            }
            ,
            {
                path: 'payment',
                element: <Payment />
            }
            ,
            {
                path: 'product/:id',
                element: <UpdateProducts />,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/product/${params.id}`)
            }

        ]
    }
]);