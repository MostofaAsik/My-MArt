"use client";

import { useState, useEffect } from "react";
import { addProduct } from "@/app/actions/product";

const AddProductForm = () => {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        image: "",
        category: "",
        description: "",
    });

    const [imgUrl, setImgUrl] = useState("");
    console.log(imgUrl);
    const [categories, setCategories] = useState([]); // Initialize as an empty array
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/category`);
                const data = await res.json();
                setCategories(data);
                if (data.length > 0) {
                    setProduct((prev) => ({ ...prev, category: data[0]._id || "" }));
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]:
                e.target.name === "price" ? Number(e.target.value) : e.target.value,
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Final_project");
        formData.append("cloud_name", "dlonos5ek");

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/dlonos5ek/image/upload`,
                { method: "POST", body: formData }
            );
            const result = await res.json();
            const img = { public_id: result.public_id, secure_url: result.secure_url };
            setProduct({ ...product, image: img });
            setImgUrl(result.secure_url);
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.image) {
            alert("Please wait for the image to upload.");
            return;
        }
        await addProduct(product);
    };

    if (isLoading) {
        return <p className="text-center mt-8 text-gray-600">Loading...</p>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        value={product.title}
                        onChange={handleChange}
                        name="title"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                        value={product.price}
                        onChange={handleChange}
                        name="price"
                        type="number"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        value={product.description}
                        onChange={handleChange}
                        name="description"
                        rows="3"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        value={product.category}
                        name="category"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {product.image?.secure_url && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">Image Preview:</p>
                            <img
                                src={product.image?.secure_url}
                                alt="Uploaded Preview"
                                className="w-24 h-24 object-cover rounded-lg mt-2"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
