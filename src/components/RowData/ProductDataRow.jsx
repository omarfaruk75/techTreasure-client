
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Link } from 'react-router-dom';

const ProductDataRow = ({ product, refetch }) => {
    const axiosSecure = useAxiosSecure();
    // const [isOpen, setIsOpen] = useState(false);
    const [isAcceptDisabled, setIsAcceptDisabled] = useState(false);
    const [isRejectDisabled, setIsRejectDisabled] = useState(false);

    useEffect(() => {
        if (product.status === 'Accepted') {
            setIsAcceptDisabled(true);
            setIsRejectDisabled(true);
        } else if (product.status === 'Rejected') {
            setIsAcceptDisabled(true);
        }
    }, [product.status]);

    const { mutateAsync: updateProductStatus } = useMutation({
        mutationFn: async status => {
            const { data } = await axiosSecure.patch(`/product/update/${product._id}`, { status });
            return data;
        },
        onSuccess: data => {
            console.log(data);
            toast.success('Product Status Updated Successfully');
            // setIsOpen(false);
            refetch();
        }
    });

    const handleAccept = async () => {
        try {
            await updateProductStatus('Accepted');
            setIsAcceptDisabled(true);
            setIsRejectDisabled(true);
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    const handleReject = async () => {
        try {
            await updateProductStatus('Rejected');
            setIsRejectDisabled(true);
            setIsAcceptDisabled(true);
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{product?.productName}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <Link to={`/productDetails/${product._id}`} className='text-gray-900 whitespace-no-wrap'>View Details Page</Link>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                {product?.status ? (
                    <p className={`${product.status === 'Accepted' ? 'text-green-500' : 'text-yellow-500'} whitespace-no-wrap`}>
                        {product.status}
                    </p>
                ) : (
                    <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
                )}
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button
                    onClick={handleAccept}
                    disabled={isAcceptDisabled}
                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${isAcceptDisabled ? 'cursor-not-allowed text-gray-500 bg-gray-200' : 'cursor-pointer text-green-900 bg-green-200'}`}
                >
                    <span aria-hidden='true' className='absolute inset-0 opacity-50 rounded-full'></span>
                    <span className='relative'>Accept</span>
                </button>
                <button
                    onClick={handleReject}
                    disabled={isRejectDisabled}
                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${isRejectDisabled ? 'cursor-not-allowed text-gray-500 bg-gray-200' : 'cursor-pointer text-red-900 bg-red-200'}`}
                >
                    <span aria-hidden='true' className='absolute inset-0 opacity-50 rounded-full'></span>
                    <span className='relative'>Reject</span>
                </button>
            </td>
        </tr>
    );
};

ProductDataRow.propTypes = {
    product: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default ProductDataRow;