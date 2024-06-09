
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const FeaturedProducts = () => {
    const { user } = useAuth();
    const [productVotes, setProductVotes] = useState({});
    const axiosCommon = useAxiosCommon();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/product`);
            return data;
        }
    });


    const handleVote = async (productId) => {
        try {
            // Check if the user has already voted for this product
            if (productVotes[productId]) {
                console.log("You have already voted for this product.");
                return;
            }

            // Make the vote request
            const response = await axiosCommon.patch(`/product/${productId}/vote`, { voteType: 'upvote' });

            if (response.data.success) {
                // Update productVotes state to mark that the user has voted for this product
                setProductVotes((prevProductVotes) => ({
                    ...prevProductVotes,
                    [productId]: true
                }));

                // Update productVotes with the new vote count
                setProductVotes((prevProductVotes) => ({
                    ...prevProductVotes,
                    [productId]: {
                        currentVote: 'upvote',
                        voteCount: response.data.voteCount
                    }
                }));
            }
        } catch (error) {
            console.error("Error updating vote:", error);
        }
    };
    //latest sorting
    const featuredProducts = products.filter(product => product.role === 'featured')
    const sortedProducts = featuredProducts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <SectionTitle heading={'Explore Featured Products'} subHeading={'Featured Products'} />
            <div className="flex flex-col md:flex-row items-center flex-wrap gap-4">
                {sortedProducts.slice(0, 4).map((product) => {
                    const isOwner = user && user.email === product.productOwner.email;
                    const productVote = productVotes[product._id] || { currentVote: product.currentVote, voteCount: product.voteCount };
                    const upvoted = productVote.currentVote === 'upvote';
                    const downvoted = productVote.currentVote === 'downvote';

                    return (
                        <div key={product._id} className="flex w-1/2 md:w-[48%] overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                            <div className="w-1/2 bg-cover" style={{ backgroundImage: `url(${product.image})` }}></div>
                            <div className="w-1/2 p-4 md:p-4">
                                <Link to={`/productDetails/${product._id}`} className="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">
                                    {product.productName}
                                </Link>
                                <span className="mt-1 text-base text-gray-600 dark:text-gray-300">{new Date(product.timestamp).toLocaleString()}</span>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{product.productDetails.substring(0, 100)}</p>
                                <div className="mt-6">
                                    <h3 className="text-xl pb-4">Tags:</h3>
                                    <ul className="flex flex-row justify-start items-center gap-2 text-base flex-wrap">
                                        {product.tagsItem && product.tagsItem.map((tag, index) => (
                                            <li key={index}>{tag}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-row gap-8 mt-12 items-center">
                                    <div className="flex flex-row justify-center items-center gap-4">
                                        <button
                                            onClick={() => handleVote(product._id, upvoted ? 'neutral' : 'upvote')}
                                            disabled={isOwner}
                                            className={`px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform rounded ${upvoted ? 'bg-green-600' : 'bg-gray-800'} dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600`}
                                        >
                                            <BiSolidUpvote />
                                        </button>
                                        <span>{productVote.voteCount}</span>
                                    </div>
                                    <div className="flex flex-row justify-center items-center gap-4">
                                        <button
                                            // onClick={() => handleVote(product._id, downvoted ? 'neutral' : 'downvote')}
                                            disabled={isOwner}
                                            className={`px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform rounded ${downvoted ? 'bg-red-600' : 'bg-gray-800'} dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600`}
                                        >
                                            <BiSolidDownvote />
                                        </button>
                                        <span>0</span>
                                        {/* <span>{productVote.voteCount}</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturedProducts;

