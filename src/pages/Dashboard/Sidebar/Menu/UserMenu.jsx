import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useRole from "../../../../hooks/useRole";
import toast from "react-hot-toast";
import MenuItem from "../MenuItem";
import { BsFillHouseAddFill, BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import BecomeModerator from "../../../../components/Modal/BecomeModerator";


const UserMenu = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [role] = useRole()
    //for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const modalHandler = async () => {
        console.log('i want to be host');

        try {
            const currentUser = {
                email: user?.email,
                role: 'user',
                status: 'Requested'
            }
            const { data } = await axiosSecure.put(`/user`, currentUser)
            console.log(data);
            if (data.modifiedCount > 0) {
                toast.success('Success! Please wait for admin confirmation')
            }
            else {
                toast.success('Please! Please wait for admin approval')
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message)
        } finally {
            closeModal()
        }
    }
    return (
        <>
            <MenuItem
                icon={BsFillHouseAddFill}
                label='Add Products'
                address='add-products' />

            <MenuItem
                icon={BsFingerprint}
                label='My Products'
                address='my-Products'
            />


            {role === "user" && (
                <div onClick={() => setIsModalOpen(true)} className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
                    <GrUserAdmin className='w-5 h-5' />

                    <span className='mx-4 font-medium'>Become A Moderator</span>
                </div>

            )}
            <BecomeModerator isOpen={isModalOpen} modalHandler={modalHandler} closeModal={closeModal} />
        </>
    )
};

export default UserMenu;