import { BiSolidUpvote } from 'react-icons/bi';
import image from '../../assets/banner/6.jpg'
import { TbReport } from "react-icons/tb";
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProductReview from './ProductReview';
import PostReview from './PostReview';

const ProductDetails = () => {
    return (
        <div>
            <div className='  rounded-md  md:min-h-[350px] '>
                <div >
                    <img className="object-center object-cover w-full h-[80vh] " src={image} alt="avatar" />
                </div>

                <h1 className='mt-12  text-2xl font-medium text-gray-800  '>
                    <span className="text-lg"> Product Name</span>:
                </h1>

                <p className='mt-2  text-sm text-gray-600 '>
                    <span className="font-bold "> Description:</span>
                </p>

                <div className=" mt-6 ">
                    <h3 className="text-xl pb-4">Tags:</h3>
                    <ul className="flex flex-row justify-start items-center gap-6 text-lg">
                        <li>Tag1</li>
                        <li>Tag2</li>
                        <li>Tag3</li>
                        <li>Tag4</li>
                        <li>Tag5</li>
                    </ul>
                </div>

                <div className="flex flex-row gap-8 mt-12 item-center">

                    <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidUpvote /></button>
                    <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><TbReport /></button>
                </div>



            </div>
            <div>
                <SectionTitle heading={'Product Reviews'} subHeading={'Reviews'} />
                <ProductReview />
                <PostReview />
            </div>
        </div>
    );
};

export default ProductDetails;