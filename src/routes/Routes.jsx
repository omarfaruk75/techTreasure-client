import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import NotFound from "../components/NotFound";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/SignIn/Login";
import SignUp from "../pages/Register/SignUp"
import Products from "../pages/Products/FeaturedProductCard";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import AddProducts from "../pages/Dashboard/UserDashboard/AddProducts";
import Statistics from "../pages/Dashboard/AdminDashboard/Statistics";
import MyProduct from "../pages/Dashboard/UserDashboard/MyProduct";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import Profile from "../pages/Dashboard/Profile";
import DashboardLayout from "../layout/DashboardLayout";
import ManageCoupon from "../pages/Dashboard/AdminDashboard/ManageCoupon";
import ProductReviewQueue from "../pages/Dashboard/ModeratorDashboard/ProductReviewQueue";
import ReportedContentPage from "../pages/Dashboard/ModeratorDashboard/ReportedContentPage";
import UpdateProducts from "../pages/Dashboard/UserDashboard/UpdateProducts";

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
                element: <Products />
            }
            ,
            {
                // path: "product/:id",
                path: "productDetails",
                element: <ProductDetails />
            }
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
        element: <DashboardLayout />,
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
                element: <ReportedContentPage />
            },
            {
                path: 'profile',
                element: <Profile />
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