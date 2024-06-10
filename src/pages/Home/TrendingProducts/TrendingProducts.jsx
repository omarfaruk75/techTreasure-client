
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
                {sortedProducts.slice(0, 6).map(product => (
                    <div key={product._id} className="w-[32%] h-[600px] overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 flex flex-col">
                        <div className="h-[50%] flex items-center justify-center overflow-hidden">
                            <img className="object-cover w-[80%] h-full" src={product.image} alt="Article" />
                        </div>
                        <div className="p-4 h-[50%] flex flex-col justify-between">
                            <div>
                                <Link to={`/productDetails/${product._id}`} className="block text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">
                                    {product.productName}
                                </Link>
                                <span className="block text-xs text-gray-600 dark:text-gray-300">{product.timestamp}</span>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 truncate">{product.productDetails.substring(0, 100)}</p>
                            </div>
                            <div>
                                <h3 className="text-xl pb-4">Tags:</h3>
                                <ul className="flex flex-wrap gap-2 text-base">
                                    {product.tagsItem && product.tagsItem.map((tag, index) => (
                                        <li key={index} className="truncate">{tag}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-row gap-4 mt-4 items-center">
                                <div className="flex items-center gap-4 text-lg">
                                    <span>{product.voteCount}</span>
                                    <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                                        <BiSolidUpvote />
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 text-lg">
                                    <span>0</span>
                                    <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                                        <BiSolidDownvote />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div>
                <Link to="/products" className="flex flex-row justify-center items-center  font-medium w-40 px-2 rounded-xl py-2 mx-auto bg-[#6369e8] text-white  my-4">Show All Products</Link>
            </div>
        </div>
    );
};

export default TrendingProducts;
