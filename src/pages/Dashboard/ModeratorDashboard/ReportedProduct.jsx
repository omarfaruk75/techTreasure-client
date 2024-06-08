


// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import { Helmet } from "react-helmet-async";
// import ProductDataRow from "../../../components/RowData/ProductDataRow";

import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import ReportedDataRow from "../../../components/RowData/ReportedDataRow";
import toast from "react-hot-toast";

const ReportedProduct = () => {
    const axiosSecure = useAxiosSecure();
    // const { data: products = [], isLoading, refetch } = useQuery({
    //     queryKey: ['product'],
    //     queryFn: async () => {
    //         const { data } = await axiosSecure(`/product`)
    //         return data;
    //     }
    // });
    // console.log(products);
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['my-products'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/product`)
            console.log(data);
            return data;
        }
    });
    console.log(products);

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/product/reject/${id}`);
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

    const reportedProducts = products.filter(product => product.status === 'Rejected');

    if (isLoading) return <LoadingSpinner />
    return (
        <>
            <div className='container mx-auto px-4 sm:px-8'>
                <Helmet>
                    <title>Reported Products </title>
                </Helmet>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
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
                                            View Details Page
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Delete Product
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>{reportedProducts.map(product => <ReportedDataRow key={product._id} refetch={refetch} product={product} handleDelete={handleDelete} />)}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportedProduct