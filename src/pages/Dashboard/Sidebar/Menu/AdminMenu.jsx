import { FaUserCog } from "react-icons/fa";
import MenuItem from "../MenuItem";
import { BsFileBarGraph } from "react-icons/bs";


const AdminMenu = () => {
    return (
        <>
            <MenuItem icon={BsFileBarGraph} label='Statistics' address='statistics' />
            <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
            <MenuItem icon={FaUserCog} label='Manage Couposns' address='manage-coupons' />
        </>
    )
};

export default AdminMenu;