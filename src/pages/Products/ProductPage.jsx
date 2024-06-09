
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useEffect, useState } from "react";
const ProductPage = () => {
    const [search, setSearch] = useState('')
    const [productItem, setProductItem] = useState([]);
    const axiosCommon = useAxiosCommon();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/product`);
            return data;
        }
    });

    // console.log(products);
    //latest sorting
    // const productAccepted = products.filter(product => product.status === 'Accepted')
    // console.log(productAccepted);

    const productAccepted = products
        .filter(product => product.status === 'Accepted')
        .sort((a, b) => {
            // Check if tagsItem contains the searched tag
            const aContainsTag = a.tagsItem.includes(search);
            const bContainsTag = b.tagsItem.includes(search);

            // Sort products with the searched tag first
            if (aContainsTag && !bContainsTag) return -1;
            if (!aContainsTag && bContainsTag) return 1;

            // Otherwise, maintain the existing order
            return 0;
        });

    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosCommon(`/product?search=${search}`)
            setProductItem(data);
        }
        getData()
    }, [search, axiosCommon])

    const handleSearch = async (e) => {
        e.preventDefault();
        const text = e.target.search.value;
        console.log(text);
        setSearch(text);
    }


    if (isLoading) return <LoadingSpinner />;


    return (
        <div>
            <form onSubmit={handleSearch} className="input input-bordered flex item-center mr-0">
                <input type="text" name="search" className="grow" placeholder="Search Your Service" />
                <button type="submit" className="badge bg-[#6E6B58] p-6 text-white text-lg">Search</button>
            </form>

            <div className="flex flex-col md:flex-row  items-center  flex-wrap gap-4">
                {productAccepted.map(product => (
                    <div key={product._id} className="w-[32%] overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <img className="object-cover w-full h-40" src={product.image} alt="Article" />

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
        </div>
    )
};

export default ProductPage;

