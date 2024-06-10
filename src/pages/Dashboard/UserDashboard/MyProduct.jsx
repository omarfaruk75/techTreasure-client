
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast'
import ProductRow from '../../../components/RowData/ProductRow';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { Helmet } from 'react-helmet-async';



const MyProduct = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['my-products', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/products/${user?.email}`)
            console.log(data);
            return data;
        }
    });
    console.log(products);

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/product/${id}`);
            return data;
        },
        onSuccess: data => {
            console.log(data);
            toast.success('successfully deleted')
            refetch()
        }
    })
    const handleDelete = async id => {
        try {
            await mutateAsync(id)
        } catch (err) {
            console.log(err);
        }
        console.log(id);
    }
    if (isLoading) return <LoadingSpinner />
    return (
        <>
            <Helmet>
                <title>My Products</title>
            </Helmet>

            <div className='container  mx-auto  sm:px-8'>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <h2 className="text-2xl text-center my-8">My Products</h2>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            #
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Product Name
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            No. of Vote
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Status
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Delete
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Update
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{/* Room row data */}

                                    {products.map((product, index) => <ProductRow key={product._id} index={index} product={product} refetch={refetch} handleDelete={handleDelete} />)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProduct