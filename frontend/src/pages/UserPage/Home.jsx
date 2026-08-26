import React, { useEffect, useState } from "react";
import PosterCard from "../../components/PosterCard";
import PosterBilder from "./PosterBilder";
import axios from "axios";

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState("Burger");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showBuilder, setShowBuilder] = useState(false);
    const [ProductData, setProductData] = useState([]);

    const slides = ["Burger", "Side", "Drink"];

    const getProductData = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/product/getProductData",
                {
                    category: currentSlide,
                }
            );
            setProductData(response.data.data || []);

        } catch (error) {
            console.error("Product API Error:", error);
        }
    };

    useEffect(() => {
        getProductData();
    }, [currentSlide]);


    const handleSelect = (product) => {
        const alreadySelected = selectedProducts.some(
            (item) =>
                item._id === product._id &&
                item.category === currentSlide
        );

        if (alreadySelected) {
            setSelectedProducts((prev) =>
                prev.filter(
                    (item) =>
                        !(
                            item._id === product._id &&
                            item.category === currentSlide
                        )
                )
            );
        } else {
            setSelectedProducts((prev) => [
                ...prev,
                {
                    ...product,
                    category: currentSlide,
                },
            ]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">

            {!showBuilder ? (
                <div className="w-full max-w-6xl mx-auto">

                    <div className="flex justify-center">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-white p-2 rounded-xl shadow-sm">

                            {slides.map((item) => (
                                <button
                                    key={item}
                                    onClick={() =>
                                        setCurrentSlide(item)
                                    }
                                    className={`
                                        px-4 py-2.5
                                        sm:px-6 sm:py-3
                                        text-sm sm:text-base
                                        rounded-lg font-medium
                                        transition-all duration-200
                                        ${currentSlide === item
                                            ? "bg-blue-600 text-white shadow"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }
                                    `}
                                >
                                    {item}
                                </button>
                            ))}

                        </div>
                    </div>

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            gap-4
                            sm:gap-5
                            lg:gap-6
                            mt-8
                        "
                    >

                        {ProductData.map((product) => {

                            const isSelected =
                                selectedProducts.some(
                                    (item) =>
                                        item._id === product._id &&
                                        item.category === currentSlide
                                );

                            return (
                                <div
                                    key={product._id}
                                    onClick={() =>
                                        handleSelect(product)
                                    }
                                    className={`
                                        cursor-pointer
                                        rounded-xl
                                        transition-all
                                        duration-200
                                        ${isSelected
                                            ? "ring-4 ring-blue-500"
                                            : "hover:scale-[1.02]"
                                        }
                                    `}
                                >
                                    <PosterCard
                                        image={`http://localhost:8080${product.imageUrl}`}
                                        name={product.name}
                                        price={product.price}
                                    />
                                </div>
                            );
                        })}

                    </div>

                    <div className="mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-sm">

                        <div className="flex items-center justify-between mb-4">

                            <h2 className="text-lg sm:text-xl font-bold">
                                Selected Products
                            </h2>

                            <span className="text-sm text-gray-500">
                                {selectedProducts.length} selected
                            </span>

                        </div>

                        {selectedProducts.length === 0 ? (

                            <p className="text-gray-500">
                                No products selected
                            </p>

                        ) : (

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                                {selectedProducts.map((product) => (

                                    <div
                                        key={`${product.category}-${product._id}`}
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                            px-4
                                            py-3
                                            bg-blue-50
                                            border
                                            border-blue-100
                                            rounded-lg
                                        "
                                    >

                                        <div className="min-w-0">

                                            <p className="font-medium text-blue-900 truncate">
                                                {product.name}
                                            </p>

                                            <p className="text-xs text-blue-600">
                                                {product.category}
                                            </p>

                                        </div>

                                        <span className="font-semibold text-blue-700">
                                            ₹{product.price}
                                        </span>

                                    </div>

                                ))}

                            </div>
                        )}

                        {/* Next */}
                        <div className="flex justify-end mt-6">

                            <button
                                disabled={
                                    selectedProducts.length === 0
                                }
                                onClick={() =>
                                    setShowBuilder(true)
                                }
                                className="
                                    px-6
                                    py-3
                                    bg-blue-600
                                    text-white
                                    rounded-lg
                                    font-semibold
                                    hover:bg-blue-700
                                    disabled:bg-gray-300
                                    disabled:cursor-not-allowed
                                    transition
                                "
                            >
                                Next →
                            </button>

                        </div>

                    </div>

                </div>

            ) : (


                <div className="max-w-6xl mx-auto">

                    <button
                        onClick={() =>
                            setShowBuilder(false)

                        }
                        className="
                            mb-5
                            px-5
                            py-2.5
                            bg-gray-800
                            text-white
                            rounded-lg
                            hover:bg-gray-900
                        "
                    >
                        ← Back
                    </button>

                    <PosterBilder
                        selectedProducts={selectedProducts}
                        setShowBuilder={setShowBuilder}
                        setSelectedProducts={setSelectedProducts}
                    />

                </div>
            )}

        </div>
    );
};

export default Home;