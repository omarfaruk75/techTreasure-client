// import { BiSolidDownvote, BiSolidUpvote } from 'react-icons/bi';
// import SectionTitle from '../../components/SectionTitle/SectionTitle';
// import ProductReview from './ProductReview';
// import PostReview from './PostReview';
// import { useLoaderData } from 'react-router-dom';

// const ProductDetails = () => {
//     const product = useLoaderData()
//     const { image, productName, productDetails, tagsItem, voteCount, _id } = product;
//     return (
//         <div>
//             <div className='  rounded-md  md:min-h-[350px] '>
//                 <div >
//                     <img className="object-center object-cover w-full h-[80vh] " src={image} alt="avatar" />
//                 </div>

//                 <h1 className='mt-12  text-2xl font-medium text-gray-800  '>
//                     <span className="text-lg"> {productName}</span>:
//                 </h1>

//                 <p className='mt-2  text-sm text-gray-600 '>
//                     <span className="font-bold "> Description: {productDetails}</span>
//                 </p>

//                 <div className=" mt-6 ">
//                     <h3 className="text-xl pb-4">Tags:</h3>
//                     <ul className="flex flex-row justify-start items-center gap-6 text-lg">
//                         {tagsItem && tagsItem.map((tag, index) => (
//                             <li key={index}>{tag}</li>
//                         ))}
//                     </ul>
//                 </div>

//                 <div className="flex flex-row gap-8 mt-12 item-center">

//                     <div className='flex flex-row gap-4 items-center'>
//                         <span>{voteCount}</span>
//                         <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidUpvote /></button>
//                     </div>
//                     <div className='flex flex-row gap-4 items-center'>
//                         <span>0</span>
//                         <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidDownvote /></button>
//                     </div>
//                 </div>



//             </div>
//             <div>
//                 <SectionTitle heading={'Product Reviews'} subHeading={'Reviews'} />
//                 <ProductReview productName={productName} />
//                 <SectionTitle heading={'Add Reviews'} subHeading={'post Review'} />
//                 <PostReview />
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;


import { BiSolidDownvote, BiSolidUpvote } from 'react-icons/bi';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import PostReview from './PostReview';
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';

const ProductDetails = () => {
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();

    const { data, isLoading, error } = useQuery({
        queryKey: ['product-details-with-reviews', id],
        queryFn: async () => {
            const response = await axiosCommon.get(`/product-details-with-reviews/${id}`);
            return response.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p>Error loading data</p>;

    const { product, reviews } = data;
    console.log({ product, reviews });
    const { image, productName, productDetails, tagsItem, voteCount } = product;

    return (
        <div>
            <div className='rounded-md md:min-h-[350px]'>
                <div>
                    <img className="object-center object-cover w-full h-[80vh]" src={image} alt={productName} />
                </div>

                <h1 className='mt-12 text-2xl font-medium text-gray-800'>
                    <span className="text-lg">{productName}</span>:
                </h1>

                <p className='mt-2 text-sm text-gray-600'>
                    <span className="font-bold">Description: {productDetails}</span>
                </p>

                <div className="mt-6">
                    <h3 className="text-xl pb-4">Tags:</h3>
                    <ul className="flex flex-row justify-start items-center gap-6 text-lg">
                        {tagsItem && tagsItem.map((tag, index) => (
                            <li key={index}>{tag}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-row gap-8 mt-12 items-center">
                    <div className='flex flex-row gap-4 items-center'>
                        <span>{voteCount}</span>
                        <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                            <BiSolidUpvote />
                        </button>
                    </div>
                    <div className='flex flex-row gap-4 items-center'>
                        <span>0</span>
                        <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                            <BiSolidDownvote />
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <SectionTitle heading={'Product Reviews'} subHeading={'Reviews'} />
                <h2>Reviews</h2>
                <div className='flex flex-col md:flex-row items-center gap-6 flex-wrap'>
                    {reviews.map(review => (
                        <div key={review._id} className="w-[32%] px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                            <div className="mt-2">
                                <p className="mt-2 text-black dark:text-gray-300">Comment: {review.description.substring(0, 80)}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <div className="flex items-center">
                                    <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={review.image} alt="avatar" />
                                    <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">{review.name}</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <SectionTitle heading={'Add Reviews'} subHeading={'Post Review'} />
                <PostReview productName={productName} />
            </div>
        </div>
    );
};

export default ProductDetails;
