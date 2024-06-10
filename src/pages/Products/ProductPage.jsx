
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { Link, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useEffect, useState } from "react";
import useAxiosCommon from "../../hooks/useAxiosCommon";
const ProductPage = () => {
    const [search, setSearch] = useState('')
    const [productItem, setProductItem] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6); // Use useState(6) instead of just (10)

    const axiosCommon = useAxiosCommon();
    const { count } = useLoaderData();
    console.log({ count });
    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()]
    console.log(pages);

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/product`);
            return data;
        }
    });



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


    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axiosCommon.get(`/product?page=${currentPage}&size=${itemsPerPage}`);
                setProductItem(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getData();
    }, [currentPage, itemsPerPage, axiosCommon]);

    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(0);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const text = e.target.search.value;
        setSearch(text);
        setCurrentPage(0); // Reset to first page on search
    };

    if (isLoading) return <LoadingSpinner />;


    return (
        <div>
            <form onSubmit={handleSearch} className="input input-bordered flex item-center mr-0">
                <input type="text" name="search" className="grow" placeholder="Search Your Service" />
                <button type="submit" className="badge bg-[#6E6B58] p-6 text-white text-lg">Search</button>
            </form>

            <div className="flex flex-col md:flex-row mt-6 items-center  flex-wrap gap-4">
                {productAccepted.map(product => (
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
            <div className="flex flex-row justify-center mt-4 my-4 text-white">
                <div className="flex flex-row justify-center  bg-[#6369e8]">
                    <div className='pagination space-x-6  p-6'>

                        <button onClick={handlePrevPage}>Prev</button>
                        {pages.map(page => (
                            <button
                                className={currentPage === page ? 'selected' : undefined}
                                onClick={() => setCurrentPage(page)}
                                key={page}
                            >{page + 1}</button>
                        ))}
                        <button onClick={handleNextPage}>Next</button>
                        <select className="text-black" value={itemsPerPage} onChange={handleItemsPerPage}>
                            <option value="6">6</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductPage;

