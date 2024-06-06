import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from "../MenuItem";

const ModeratorMenu = () => {
    return (
        <>

            <MenuItem icon={MdHomeWork} label='Product Review Queue' address='product-reviewQueue' />
            <MenuItem
                icon={MdOutlineManageHistory}
                label='Reported Contents'
                address='reported-content'
            />
        </>
    )
};

export default ModeratorMenu;