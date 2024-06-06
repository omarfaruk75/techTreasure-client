import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";

const UpdateProducts = () => {
    const product = useLoaderData();
    const { productDetails, productName, link, image, _id, tagsItem } = product;
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tags, setTags] = useState(tagsItem || []);
    const inputRef = useRef(null);
    const axiosCommon = useAxiosCommon();
    const { register, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            productName,
            productDetails,
            link,
            tagsItem,
            image,
        },
    });

    useEffect(() => {
        // Set default values
        setValue("productName", productName);
        setValue("productDetails", productDetails);
        setValue("link", link);
        setValue("tagsItem", tagsItem);
        setValue("image", image);
    }, [product, setValue]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newTag = e.target.value.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                e.target.value = '';
            }
        }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        try {
            const productItem = {
                productName: data.productName,
                productDetails: data.productDetails,
                tagsItem: tags,
                timestamp: new Date().toLocaleString(),
                image: data.image || image,
                link: data.link,
                status: 'pending',
                productOwner: {
                    email: user?.email,
                    name: user?.displayName,
                    photo: user?.photoURL,
                },
            };

            const response = await axiosCommon.patch(`/product/${_id}`, productItem);
            console.log(response.data.modifiedCount);
            if (response.data.modifiedCount > 0) {
                reset();
                navigate('/dashboard/my-products')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.productName} has been updated successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error updating product:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again.',
            });
        }
    };

    return (
        <div>
            <SectionTitle heading={'Update Product'} subHeading={"Update Info"} />
            <div className="container mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Product Name*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Product Name"
                            {...register("productName", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </label>
                    <div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Product Details</span>
                            </div>
                            <textarea
                                className="textarea textarea-bordered"
                                {...register("productDetails", { required: true })}
                                placeholder="Details"
                            />
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
                            <input
                                onKeyDown={handleKeyDown}
                                ref={inputRef}
                                type="text"
                                className="tags-input uppercase border-0 outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-16">
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Product Image URL</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Image URL"
                                {...register("image", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </label>
                        <label className="form-control w-1/2">
                            <div className="label">
                                <span className="label-text">Website Link</span>
                            </div>
                            <input
                                type="text"
                                {...register("link", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>
                    <h2 className="text-base">User Details</h2>
                    <div className="flex flex-row justify-stretch items-center gap-16">
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            readOnly
                            defaultValue={user?.displayName}
                            className="input input-bordered w-full max-w-xs"
                        />
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            readOnly
                            defaultValue={user?.email}
                            className="input input-bordered w-full max-w-xs"
                        />
                        <input
                            type="text"
                            {...register("photo", { required: true })}
                            readOnly
                            defaultValue={user?.photoURL}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <button className="btn text-white bg-secondary w-full">
                        Update Product <FaUtensils />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProducts;
