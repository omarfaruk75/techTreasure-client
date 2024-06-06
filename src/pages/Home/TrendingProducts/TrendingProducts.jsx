
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
const TrendingProducts = () => {


    const axiosCommon = useAxiosCommon();
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/product`);
            return data;
        }
    });
    //latest sorting by votecount
    const sortedProducts = products.sort((a, b) => (b.voteCount) - (a.voteCount));
    return (
        <div>
            <SectionTitle heading={'Favourite Trending Products'} subHeading={'Trending Products'} />

            <div className="flex flex-col md:flex-row  items-center  flex-wrap gap-4">
                {sortedProducts.map(product => (
                    <div key={product._id} className="w-[32%] overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <img className="object-cover w-full h-64" src={product.image} alt="Article" />

                        <div className="p-6">
                            <div>
                                {/* <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{product.voteCount}</span> */}
                                <Link to={`/productDetails/${product._id}`} className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">{product.productName}</Link>
                                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">{product.timestamp}</span>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{product.productDetails.substring(0, 100)}</p>

                            </div>
                            <div className=" mt-6 ">
                                <h3 className="text-xl pb-4">Tags:</h3>
                                <ul className="flex flex-row justify-start items-center gap-2 text-base flex-wrap">
                                    {product.tagsItem && product.tagsItem.map((tag, index) => (
                                        <li key={index}>{tag}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-row gap-4 mt-12 item-center">

                                <div className="flex flex-row items-center gap-4 text-lg">
                                    <span>{product.voteCount}</span>
                                    <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidUpvote /></button>
                                </div>
                                <div className="flex flex-row items-center gap-4 text-lg">
                                    <span>0</span>
                                    <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidDownvote /></button>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div>
                <Link to="/products" className="flex flex-row justify-center items-center font-medium w-40 px-2 rounded-xl py-2 mx-auto bg-green-600 my-4">Show All Products</Link>
            </div>
        </div>
    );
};

export default TrendingProducts;