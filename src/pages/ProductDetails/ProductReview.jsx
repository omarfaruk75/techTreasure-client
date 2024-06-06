import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'



const ProductReview = () => {
    const axiosCommon = useAxiosCommon();
    const { data: reviews = '', isLoading } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/reviews`)
            console.log(data);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />

    return (
        <div className='flex flex-col md:flex-row items-center gap-6 flex-wrap'>
            <div className="w-[32%] px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">

                <div className="mt-2">
                    <p className="mt-2 text-black dark:text-gray-300">{reviews[0].description}</p>
                </div>

                <div className="flex items-center justify-between mt-4">

                    <Rating
                        style={{ maxWidth: 180 }}
                        value={reviews[0].rating}
                        readOnly
                    />

                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={reviews[0].image} alt="avatar" />
                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">{reviews[0].name}</a>
                    </div>
                </div>
            </div>
            {/* <div className="w-[32%] px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">

                <div className="mt-2">
                    <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0" role="link">Accessibility tools for designers and developers</a>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="rating">
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" checked />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                    </div>
                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar" />
                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">Khatab wedaa</a>
                    </div>
                </div>
            </div>
            <div className="w-[32%] px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">

                <div className="mt-2">
                    <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0" role="link">Accessibility tools for designers and developers</a>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="rating">
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" checked />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                    </div>
                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar" />
                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">Khatab wedaa</a>
                    </div>
                </div>
            </div>
            <div className="w-[32%] px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">

                <div className="mt-2">
                    <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0" role="link">Accessibility tools for designers and developers</a>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="rating">
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" checked />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                    </div>
                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar" />
                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">Khatab wedaa</a>
                    </div>
                </div>
            </div>
            <div className="w-[32%] px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">

                <div className="mt-2">
                    <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0" role="link">Accessibility tools for designers and developers</a>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="rating">
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" checked />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                    </div>
                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar" />
                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">Khatab wedaa</a>
                    </div>
                </div>
            </div>
            <div className="w-[32%] px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">

                <div className="mt-2">
                    <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0" role="link">Accessibility tools for designers and developers</a>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="rating">
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" checked />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                    </div>
                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar" />
                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">Khatab wedaa</a>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default ProductReview;