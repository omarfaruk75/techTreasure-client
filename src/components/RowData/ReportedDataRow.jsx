
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const ReportedDataRow = ({ product, handleDelete }) => {



    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{product?.productName}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <Link to={`/productDetails/${product._id}`} className='text-gray-900 whitespace-no-wrap'>View Details Page</Link>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button onClick={() => handleDelete(product._id)}>Delete Product</button>

            </td>


        </tr>
    );
};

ReportedDataRow.propTypes = {
    product: PropTypes.object.isRequired,
    handleDelete: PropTypes.func,
};

export default ReportedDataRow;
