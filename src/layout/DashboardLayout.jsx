import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";



const DashboardLayout = () => {
    return (
        <div className="relative  min-h-screen md:flex ">
            {/* Sidebar */}
            <div className="mr-5">
                <Sidebar />
            </div>
            {/* outlet */}
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;