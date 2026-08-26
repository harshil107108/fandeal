import React, { useState } from "react";
import { Rnd } from "react-rnd";
import bg from "../../assets/bg.jpg";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const PosterBilder = ({ selectedProducts, setSelectedProducts, setShowBuilder }) => {
    const [posterItems, setPosterItems] = useState([]);

    console.log(selectedProducts)
    console.log(posterItems)

    const navigate = useNavigate();

    const handleDragStart = (e, product) => {
        e.dataTransfer.setData(
            "product",
            JSON.stringify(product)
        );
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const product = JSON.parse(
            e.dataTransfer.getData("product")
        );

        const alreadyAdded = posterItems.some(
            (item) =>
                item._id === product._id &&
                item.category === product.category
        );

        if (alreadyAdded) return;

        const rect = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - rect.left - 75;
        const y = e.clientY - rect.top - 75;

        setPosterItems((prev) => [
            ...prev,
            {
                ...product,
                x,
                y,
            },
        ]);
    };

    const removeFromPoster = (product) => {
        setPosterItems((prev) =>
            prev.filter(
                (item) =>
                    !(
                        item._id === product._id &&
                        item.category === product.category
                    )
            )
        );
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");

            const posterData = {
                userId: token,
                items: posterItems.map((product) => ({
                    productId: product._id,
                    x: product.x,
                    y: product.y,
                })),
                status: "pending",
                isLocked: true,
                createdAt: new Date(),
            };


            const response = await axios.post(
                "http://localhost:8080/poster/addEdit",
                posterData
            );

            setSelectedProducts([]);
            setShowBuilder(false);


        } catch (error) {
            console.error("Save Poster Error:", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">

            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="relative w-full h-[600px] overflow-hidden rounded-xl border-4 border-gray-200 shadow-lg"
            >
                {/* Background */}
                <img
                    src={bg}
                    alt="Poster Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {posterItems.map((product) => (
                    <Rnd
                        key={`${product.category}-${product._id}`}
                        bounds="parent"
                        size={{
                            width: 150,
                            height: 190,
                        }}
                        position={{
                            x: product.x,
                            y: product.y,
                        }}
                        onDragStop={(e, d) => {
                            setPosterItems((prev) =>
                                prev.map((item) =>
                                    item._id === product._id &&
                                        item.category === product.category
                                        ? {
                                            ...item,
                                            x: d.x,
                                            y: d.y,
                                        }
                                        : item
                                )
                            );
                        }}
                        className="bg-white rounded-xl shadow-xl overflow-hidden"
                    >
                        <div className="relative w-full h-full p-2">

                            <button
                                onClick={() =>
                                    removeFromPoster(product)
                                }
                                className="absolute top-1 right-1 z-10 w-7 h-7 bg-red-500 text-white rounded-full font-bold"
                            >
                                ×
                            </button>

                            <img
                                src={`http://localhost:8080${product.imageUrl}`}
                                alt={product.name}
                                className="w-full h-28 object-cover rounded-lg"
                            />

                            <p className="font-semibold text-sm mt-2 truncate">
                                {product.name}
                            </p>

                            <p className="text-blue-600 font-bold">
                                ₹{product.price}
                            </p>

                        </div>
                    </Rnd>
                ))}

                {posterItems.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/50 text-white px-6 py-3 rounded-lg">
                            Drag products here
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6">

                <h2 className="text-xl font-bold mb-4">
                    Selected Products
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

                    {selectedProducts.map((product) => {

                        const isOnPoster = posterItems.some(
                            (item) =>
                                item._id === product._id &&
                                item.category === product.category
                        );

                        return (
                            <div
                                key={`${product.category}-${product._id}`}
                                draggable={!isOnPoster}
                                onDragStart={(e) =>
                                    handleDragStart(e, product)
                                }
                                className={`
                                    bg-white
                                    rounded-xl
                                    border
                                    p-3
                                    cursor-grab
                                    transition
                                    ${isOnPoster
                                        ? "opacity-40 cursor-not-allowed"
                                        : "hover:shadow-lg hover:-translate-y-1"
                                    }
                                `}
                            >
                                <img
                                    src={`http://localhost:8080${product.imageUrl}`}
                                    alt={product.name}
                                    className="w-full h-28 object-cover rounded-lg"
                                />

                                <p className="font-semibold text-sm mt-2 truncate">
                                    {product.name}
                                </p>

                                <p className="text-blue-600 font-bold">
                                    ₹{product.price}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    {isOnPoster
                                        ? "Added to poster"
                                        : "Drag to poster"}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                    Save Poster
                </button>
            </div>

        </div>
    );
};

export default PosterBilder;    