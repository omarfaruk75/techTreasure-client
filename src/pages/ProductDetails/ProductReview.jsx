// import { useQuery } from "@tanstack/react-query";
// import useAxiosCommon from "../../hooks/useAxiosCommon";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import { Rating } from "@smastrom/react-rating";
// import '@smastrom/react-rating/style.css'



// const ProductReview = ({ productName }) => {
//     const axiosCommon = useAxiosCommon();
//     const { data: reviews = '', isLoading } = useQuery({
//         queryKey: ['review'],
//         queryFn: async () => {
//             const { data } = await axiosCommon.get(`/reviews`)
//             console.log(data);
//             return data;
//         }
//     });
//     if (isLoading) return <LoadingSpinner />

//     return (
//         <div className='flex flex-col md:flex-row items-center gap-6 flex-wrap'>
//             {reviews.map(review => (
//                 <div key={review._id} className="w-[32%] px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">

//                     <div className="mt-2">
//                         <p className="mt-2 text-black dark:text-gray-300">Comment : {review.description.substring(0, 100)}</p>
//                     </div>

//                     <div className="flex items-center justify-between mt-4">

//                         <Rating
//                             style={{ maxWidth: 180 }}
//                             value={review.rating}
//                             readOnly
//                         />

//                         <div className="flex items-center">
//                             <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={reviews[0].image} alt="avatar" />
//                             <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">{reviews[0].name}</a>
//                         </div>
//                     </div>
//                 </div>
//             ))}

//         </div>
//     );
// };

// export default ProductReview;

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';

const ProductReview = () => {
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();

    const { data, isLoading, error } = useQuery({
        queryKey: ['product-details-with-reviews', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/product-details-with-reviews/${id}`);
            console.log(data);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error loading product details</div>;

    const { reviews } = data;

    return (
        <div>

            {/* Other product details here */}

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
        </div>
    );
};

export default ProductReview;
