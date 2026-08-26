import React, { useState } from "react";
import Select from "react-select";
import axios from "axios"

const AddProducts = () => {
    const [data, setData] = useState({
        name: "",
        category: "",
        imageUrl: null,
        price: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("category", data.category);
            formData.append("price", data.price);
            formData.append("image", data.imageUrl);

            const response = await axios.post(
                "http://localhost:8080/product/addEdit",
                formData
            );


            setData({
                name: "",
                category: "",
                imageUrl: null,
                price: "",
            });

        } catch (error) {
            console.error("API Error:", error);
        }
    };
    const options = [
        { value: "Burger", label: "Burger" },
        { value: "Side", label: "Side" },
        { value: "Drink", label: "Drink" },
    ];

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Add Product
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Add a new product to your store.
                    </p>
                </div>

                <form className="space-y-6">

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Category
                        </label>

                        <Select
                            options={options}
                            value={options.find(
                                (option) => option.value === data.category
                            )}
                            onChange={(option) =>
                                setData({
                                    ...data,
                                    category: option?.value || "",
                                })
                            }
                            placeholder="Select a category..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Image
                        </label>

                        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition">
                            <div className="text-center">
                                <p className="text-gray-600 font-medium">
                                    Click to upload image
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    PNG, JPG or JPEG
                                </p>
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        imageUrl: e.target.files[0],
                                    })
                                }
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Add Product
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddProducts;