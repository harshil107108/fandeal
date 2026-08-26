import React, { useEffect, useState } from "react";
import axios from "axios";
import bg from "../../assets/bg.jpg";



const PosterReviews = () => {
    const [posterData, setPosterData] = useState([]);


    const getPosterData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/poster/getAllPosterData"
            );

            setPosterData(response.data.data);
        } catch (error) {
            console.error("Poster Error:", error);
        }
    };

    useEffect(() => {
        getPosterData();
    }, []);

    // ================= APPROVE POSTER =================
    const handleApprove = async (posterId) => {
        try {
            const response = await axios.put(
                "http://localhost:8080/poster/updateStatus",
                {
                    id: posterId,
                    status: "approved",
                }
            );
            // Refresh poster list
            getPosterData();

        } catch (error) {
            console.error(
                "Approve Error:",
                error.response?.data || error.message
            );
        }
    };

    // ================= REJECT POSTER =================
    const handleReject = async (posterId) => {
        try {
            const response = await axios.put(
                "http://localhost:8080/poster/updateStatus",
                {
                    id: posterId,
                    status: "rejected",
                }
            );


            getPosterData();

        } catch (error) {
            console.error(
                "Reject Error:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* ================= HEADER ================= */}
            <div className="max-w-6xl mx-auto mb-8">

                <h1 className="text-3xl font-bold text-gray-900">
                    Poster Reviews
                </h1>

                <p className="text-gray-500 mt-2">
                    Review submitted posters and approve or reject them.
                </p>

            </div>

            {/* ================= POSTER LIST ================= */}
            <div className="max-w-6xl mx-auto grid gap-5">

                {/* NO POSTER */}
                {posterData.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">

                        <p className="text-gray-500">
                            No posters available for review.
                        </p>

                    </div>
                )}

                {/* POSTERS */}
                {posterData.map((poster) => (

                    <div
                        key={poster._id}
                        className="
                            bg-white
                            rounded-xl
                            shadow-sm
                            border
                            border-gray-200
                            p-5
                            flex
                            items-center
                            gap-6
                        "
                    >

                        {/* ================= POSTER PREVIEW ================= */}

                        <div
                            className="
                                w-32
                                h-32
                                bg-gray-100
                                rounded-lg
                                overflow-hidden
                                flex
                                items-center
                                justify-center
                                shrink-0
                            "
                        >

                            <div className="relative w-full h-full">

                                {/* Background */}
                                <img
                                    src={bg}
                                    alt="Poster"
                                    className="
                                        absolute
                                        inset-0
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />

                                {/* Products */}
                                {poster.items?.map((item) => {

                                    const product = item.productId;

                                    if (!product) {
                                        return null;
                                    }

                                    return (
                                        <div
                                            key={product._id}
                                            style={{
                                                position: "absolute",
                                                left: `${item.x * 0.213}px`,
                                                top: `${item.y * 0.213}px`,

                                                width: "32px",
                                                height: "40px",
                                            }}
                                            className="
                                                bg-white
                                                rounded-md
                                                overflow-hidden
                                                shadow
                                            "
                                        >

                                            {/* Product Image */}
                                            <img
                                                src={`http://localhost:8080${product.imageUrl}`}
                                                alt={product.name}
                                                className="
                                                    w-full
                                                    h-6
                                                    object-cover
                                                "
                                            />

                                            {/* Product Name */}
                                            <p
                                                className="
                                                    text-[5px]
                                                    font-semibold
                                                    truncate
                                                    px-1
                                                "
                                            >
                                                {product.name}
                                            </p>

                                            {/* Price */}
                                            <p
                                                className="
                                                    text-[5px]
                                                    text-blue-600
                                                    font-bold
                                                    px-1
                                                "
                                            >
                                                ₹{product.price}
                                            </p>

                                        </div>
                                    );
                                })}

                                {/* ================= STATUS ON POSTER ================= */}

                                <div
                                    className={`
                                        absolute
                                        top-1
                                        right-1
                                        z-50
                                        px-2
                                        py-0.5
                                        rounded-full
                                        text-[7px]
                                        font-bold
                                        capitalize
                                        shadow
                                        ${poster.status === "approved"
                                            ? "bg-green-500 text-white"
                                            : poster.status === "rejected"
                                                ? "bg-red-500 text-white"
                                                : "bg-yellow-400 text-gray-900"
                                        }
                                    `}
                                >
                                    {poster.status}
                                </div>

                            </div>

                        </div>

                        {/* ================= DETAILS ================= */}

                        <div className="flex-1">

                            <p className="text-sm text-gray-500 mb-1">
                                Submitted by
                            </p>

                            <p className="font-semibold text-gray-900">
                                {poster.userId?.email ||
                                    poster.userId?.name ||
                                    "Unknown User"}
                            </p>

                            {/* Status */}
                            <div className="mt-3">

                                <span
                                    className={`
                                        inline-flex
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-medium
                                        capitalize
                                        ${poster.status === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : poster.status === "rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }
                                    `}
                                >
                                    {poster.status}
                                </span>

                            </div>

                            {/* Product Count */}
                            <p className="text-sm text-gray-500 mt-3">
                                {poster.items?.length || 0} products
                            </p>

                        </div>

                        {/* ================= ACTIONS ================= */}

                        <div className="flex gap-3">

                            <button
                                onClick={() =>
                                    handleApprove(poster._id)
                                }
                                disabled={
                                    poster.status === "approved"
                                }
                                className="
                                    px-5
                                    py-2.5
                                    bg-green-600
                                    text-white
                                    rounded-lg
                                    font-medium
                                    hover:bg-green-700
                                    disabled:bg-gray-300
                                    disabled:cursor-not-allowed
                                    transition
                                "
                            >
                                Approve
                            </button>

                            <button
                                onClick={() =>
                                    handleReject(poster._id)
                                }
                                disabled={
                                    poster.status === "rejected"
                                }
                                className="
                                    px-5
                                    py-2.5
                                    bg-red-600
                                    text-white
                                    rounded-lg
                                    font-medium
                                    hover:bg-red-700
                                    disabled:bg-gray-300
                                    disabled:cursor-not-allowed
                                    transition
                                "
                            >
                                Reject
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default PosterReviews;