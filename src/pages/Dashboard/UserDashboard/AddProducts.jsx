
import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import useAuth from "../../../hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import './tagStyles.css';
import { useNavigate } from "react-router-dom";


const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddProducts = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();
    const { register, handleSubmit, reset } = useForm();
    const [tags, setTags] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [tags]);
    const onSubmit = async (data) => {
        console.log(data)
        //image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosCommon.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            //now send the menu item data to the server with the image url
            const ProductItem = {
                productName: data.productName,
                productDetails: data.productDetails,
                timestamp: new Date().toLocaleString(),
                tagsItem: tags,
                websiteLink: data.link,
                image: res.data.data.display_url,
                status: 'pending',
                productOwner: {
                    email: user?.email,
                    name: user?.displayName,
                    photo: user?.photoURL
                }
            }
            //
            const productItem = await axiosCommon.post('/product', ProductItem);
            console.log(productItem.data);
            if (productItem.data.insertedId) {
                reset()
                setTags([]);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.productName} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/my-products')

            }
        }
        console.log('with image url', res.data);


    };

    const handleKeyDown = e => {
        if (e.key !== 'Enter') return
        e.preventDefault();
        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value]);
        e.target.value = '';
        inputRef.current.focus();


    };
    const removeTag = index => {
        setTags(tags.filter((el, i) => i !== index))

    }
    return (
        <div className="container mx-auto">
            <SectionTitle heading={'Add a Product'} subHeading={"What's New"}></SectionTitle>
            <div className="w-[80%] mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

                    <label className="form-control ">
                        <div className="label">
                            <span className="label-text">Product Name*</span>
                        </div>
                        <input type="text" placeholder="Product Name" {...register("productName", { required: true })} className="input input-bordered w-full " />

                    </label>
                    <div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Product Details</span>
                            </div>
                            <textarea className="textarea textarea-bordered" {...register("productDetails", { required: true })} placeholder="Bio"></textarea>

                        </label>
                    </div>

                    <div>
                        <h2>Tags</h2>
                        <div className='tag-input-container'>
                            <h3>Tags</h3>
                            {tags.map((tag, index) => (
                                <div key={index} className='tag-item'>
                                    <span className='text'>{tag}</span>
                                    <span className='close' onClick={() => removeTag(index)}>&times;</span>
                                </div>
                            ))}
                            <input onKeyDown={handleKeyDown} ref={inputRef} type="text" name="tagsItem" className="tags-input uppercase border-0 outline-none" />
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-16">
                        <label className="form-control ">
                            <div className="label">
                                <span className="label-text">Product ImageURL</span>
                            </div>
                            <input type="file" {...register("image", { required: true })} className="file-input  file-input-bordered file-input-secondary w-full max-w-xs" />

                        </label>
                        <div>

                        </div>
                        <label className="form-control w-1/2 ">
                            <div className="label">
                                <span className="label-text">Website Link</span>
                            </div>
                            <input type="text" {...register("link", { required: true })} className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />

                        </label>
                    </div>


                    <h2 className="text-base">User Details</h2>
                    <div className="flex flex-row justify-stretch items-center gap-16">

                        <div>
                            <input type="text" {...register("name", { required: true })} readOnly defaultValue={user?.displayName} className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                        </div>
                        <div>
                            <input type="email" {...register("email", { required: true })} readOnly defaultValue={user?.email} className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                        </div>
                        <div>
                            <input type="text" {...register("photo", { required: true })} readOnly defaultValue={user?.photoURL} className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                        </div>

                    </div>
                    <button className="btn text-white bg-secondary w-full">Add Product<FaUtensils /></button>
                </form>
            </div >

        </div >
    );
};

export default AddProducts;