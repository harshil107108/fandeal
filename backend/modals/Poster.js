const mongoose = require("mongoose");

const PosterSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },

            x: {
                type: Number,
                required: true,
            },

            y: {
                type: Number,
                required: true,
            },
        },
    ],

    status: {
        type: String,
        default: "pending",
    },

    isLocked: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Poster", PosterSchema);