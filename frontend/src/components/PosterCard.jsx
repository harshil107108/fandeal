import React from "react";

const PosterCard = ({ image, name = "XYZ", price = "1" }) => {
    return (
        <div className="w-72 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">

            {/* Image */}
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-gray-400">
                        No Image
                    </span>
                )}
            </div>

            {/* Details */}
            <div className="p-4">

                <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {name}
                </h2>

                <p className="text-xl font-bold text-blue-600 mt-2">
                    ₹{price}
                </p>

            </div>
        </div>
    );
};

export default PosterCard;