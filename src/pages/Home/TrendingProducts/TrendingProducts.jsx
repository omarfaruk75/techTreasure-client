
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import image from '../../../assets/banner/6.jpg'
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { Link } from "react-router-dom";
const TrendingProducts = () => {
    return (
        <div>
            <SectionTitle heading={'Favourite Trending Products'} subHeading={'Trending Products'} />

            <div className="flex flex-col md:flex-row  items-center  flex-wrap gap-4">
                <div className="w-[32%] overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <img className="object-cover w-full h-64" src={image} alt="Article" />

                    <div className="p-6">
                        <div>
                            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">No. of Votes</span>
                            <Link to={'productDetails'} className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">Product Name</Link>
                            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">21 SEP 2015</span>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.</p>

                        </div>
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

                        <div className="flex flex-row gap-4 mt-12 item-center">

                            <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidUpvote /></button>
                            <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidDownvote /></button>
                        </div>
                    </div>
                </div>
                <div className="w-[32%] overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <img className="object-cover w-full h-64" src={image} alt="Article" />

                    <div className="p-6">
                        <div>
                            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">No. of Votes</span>
                            <Link to={'/productDetails'} className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">Product Name</Link>
                            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">21 SEP 2015</span>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.</p>

                        </div>
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

                        <div className="flex flex-row gap-4 mt-12 item-center">

                            <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidUpvote /></button>
                            <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidDownvote /></button>
                        </div>
                    </div>
                </div>
                <div className="w-[32%] overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <img className="object-cover w-full h-64" src={image} alt="Article" />

                    <div className="p-6">
                        <div>
                            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">No. of Votes</span>
                            <Link to={'/productDetails'} className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">Product Name</Link>
                            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">21 SEP 2015</span>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.</p>

                        </div>
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

                        <div className="flex flex-row gap-4 mt-12 item-center">

                            <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidUpvote /></button>
                            <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidDownvote /></button>
                        </div>
                    </div>
                </div>
                <div className="w-[32%] overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <img className="object-cover w-full h-64" src={image} alt="Article" />

                    <div className="p-6">
                        <div>
                            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">No. of Votes</span>
                            <Link to={'/productDetails'} className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">Product Name</Link>
                            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">21 SEP 2015</span>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.</p>

                        </div>
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

                        <div className="flex flex-row gap-4 mt-12 item-center">

                            <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidUpvote /></button>
                            <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidDownvote /></button>
                        </div>
                    </div>
                </div>
                <div className="w-[32%] overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <img className="object-cover w-full h-64" src={image} alt="Article" />

                    <div className="p-6">
                        <div>
                            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">No. of Votes</span>
                            <Link to={'/productDetails'} className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">Product Name</Link>
                            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">21 SEP 2015</span>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.</p>

                        </div>
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

                        <div className="flex flex-row gap-4 mt-12 item-center">

                            <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidUpvote /></button>
                            <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidDownvote /></button>
                        </div>
                    </div>
                </div>
                <div className="w-[32%] overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <img className="object-cover w-full h-64" src={image} alt="Article" />

                    <div className="p-6">
                        <div>
                            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">No. of Votes</span>
                            <Link to={'/productDetails'} className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">Product Name</Link>
                            <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">21 SEP 2015</span>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.</p>

                        </div>
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

                        <div className="flex flex-row gap-4 mt-12 item-center">

                            <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidUpvote /></button>
                            <button className="px-4 py-3 text-lg font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"><BiSolidDownvote /></button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Link className="flex flex-row justify-center items-center font-medium w-40 px-2 rounded-xl py-2 mx-auto bg-green-600 my-4" to={'/showAllProducts'}>Show All Products</Link>
            </div>
        </div>
    );
};

export default TrendingProducts;