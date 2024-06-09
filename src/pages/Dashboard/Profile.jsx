
import { Helmet } from 'react-helmet-async'
import useRole from '../../hooks/useRole';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();
    const axiosSecure = useAxiosSecure();
    const { data: subscriptionStatus, isLoading: statusLoading } = useQuery({
        queryKey: ['subscriptionStatus', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payment/status/${user?.email}`);
            return data;
        },
    });
    if (subscriptionStatus === 'Verified') {

    }

    if (loading || isLoading) return <LoadingSpinner />
    return (
        <div className='flex justify-center items-center h-screen'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className='bg-white shadow-lg rounded-2xl w-3/5'>
                <img
                    alt='profile'
                    src='https://i.ibb.co/Bq44zH4/Group-19.png'
                    className='w-full mb-4 rounded-t-lg h-36'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>
                    <p className='p-2 px-4 text-xs text-white bg-pink-500 rounded-full capitalize'>
                        {role}
                    </p>


                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-black '>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-black '>{user?.email}</span>
                            </p>

                            <div className='flex flex-col justify-center gap-4 items-center'>
                                <Link to={'/dashboard/payment'}>
                                    <button className="btn btn-sm btn-primary">Membership Subscribe $200 </button>
                                </Link>

                                <p className='bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>        Membership Status</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile