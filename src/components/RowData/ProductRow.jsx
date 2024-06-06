import PropTypes from 'prop-types'
import DeleteModal from '../Modal/DeleteModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const ProductRow = ({ product, handleDelete, index }) => {

    //for delete modal
    let [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    }
    //for update modal


    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{index + 1}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{product?.productName}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{product?.vote}</p>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{product?.status}</p>
            </td>


            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Delete</span>
                </button>
                <DeleteModal closeModal={closeModal} isOpen={isOpen} handleDelete={handleDelete} id={product?._id} />
            </td>
            <td>
                <Link to={`/dashboard/product/${product._id}`} className="btn bg-orange-500 btn-sm text-white text-2xl"><FaEdit /></Link>
            </td>

        </tr >
    )
};
ProductRow.propTypes = {
    product: PropTypes.object,
    refetch: PropTypes.func,
    index: PropTypes.index,
    handleDelete: PropTypes.func

}
export default ProductRow;





