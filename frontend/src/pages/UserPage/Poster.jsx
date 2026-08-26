import React, { useEffect, useState } from "react";
import axios from "axios";
import bg from "../../assets/bg.jpg";

const Poster = () => {
    const [posterData, setPosterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshkey, setRefreshkey] = useState(1)

    const getPosterData = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/poster/getPosterData",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setPosterData(response.data.data);

        } catch (error) {

            if (error.response?.status === 404) {
                setPosterData(null);
            } else {
                console.error("Poster Error:", error);
            }

        } finally {
            setLoading(false);
        }
    };

    const handleDeletePoster = async () => {
        try {
            await axios.post(
                "http://localhost:8080/poster/delete",
                {
                    id: posterData._id,
                }
            );


            setPosterData(null);
            setRefreshkey(refreshkey + 1)

        } catch (error) {
            console.error(
                "Delete Poster Error:",
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        getPosterData();
    }, [refreshkey]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">
                    Loading poster...
                </p>
            </div>
        );
    }

    
    if (!posterData) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-lg
                    p-10
                    text-center
                    max-w-md
                    w-full
                ">

                    <div className="text-5xl mb-4">
                        📝
                    </div>

                    <h2 className="
                        text-2xl
                        font-bold
                        text-gray-900
                    ">
                        No Poster Found
                    </h2>

                    <p className="
                        text-gray-500
                        mt-2
                    ">
                        You haven't created a poster yet.
                    </p>

                </div>

            </div>
        );
    }

    // =========================
    // POSTER
    // =========================
    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">

            <div className="max-w-6xl mx-auto">

               
                <div
                    className="
                        relative
                        w-full
                        h-[450px]
                        sm:h-[550px]
                        lg:h-[650px]
                        overflow-hidden
                        rounded-xl
                        border-4
                        border-gray-200
                        shadow-lg
                    "
                >

                    <img
                        src={bg}
                        alt="Poster Background"
                        className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                        "
                    />

                   
                    <div
                        className={`
                            absolute
                            top-4
                            right-4
                            z-50
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-bold
                            capitalize
                            shadow-lg
                            ${posterData.status === "approved"
                                ? "bg-green-500 text-white"
                                : posterData.status === "rejected"
                                    ? "bg-red-500 text-white"
                                    : "bg-yellow-400 text-gray-900"
                            }
                        `}
                    >
                        {posterData.status}
                    </div>

                    
                    {posterData.items?.map((item) => {

                        const product = item.productId;

                        if (!product) {
                            return null;
                        }

                        return (
                            <div
                                key={product._id}
                                style={{
                                    position: "absolute",
                                    left: `${item.x}px`,
                                    top: `${item.y}px`,
                                    width: "150px",
                                    height: "190px",
                                }}
                                className="
                                    bg-white
                                    rounded-xl
                                    shadow-xl
                                    overflow-hidden
                                    p-2
                                "
                            >

                                <img
                                    src={`http://localhost:8080${product.imageUrl}`}
                                    alt={product.name}
                                    className="
                                        w-full
                                        h-28
                                        object-cover
                                        rounded-lg
                                    "
                                />

                                <p className="
                                    font-semibold
                                    text-sm
                                    mt-2
                                    truncate
                                ">
                                    {product.name}
                                </p>

                                <p className="
                                    text-blue-600
                                    font-bold
                                ">
                                    ₹{product.price}
                                </p>

                            </div>
                        );
                    })}

                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">

                    <button
                        disabled={posterData.isLocked}
                        className="
                            px-6
                            py-3
                            rounded-lg
                            bg-blue-600
                            text-white
                            font-semibold
                            hover:bg-blue-700
                            disabled:bg-gray-300
                            disabled:cursor-not-allowed
                        "
                    >
                        {posterData.isLocked
                            ? "Edit (Locked)"
                            : "Edit Poster"}
                    </button>

                    <button
                        onClick={handleDeletePoster}
                        className="
                            px-6
                            py-3
                            rounded-lg
                            bg-red-500
                            text-white
                            font-semibold
                            hover:bg-red-600
                        "
                    >
                        Delete Poster
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Poster;