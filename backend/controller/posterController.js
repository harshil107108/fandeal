const PosterModal = require("../modals/Poster");

const updateStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        if (!id || !status) {
            return res.status(400).json({
                success: false,
                message: "Poster ID and status are required",
            });
        }

        if (!["approved", "rejected", "pending"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const poster = await PosterModal.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!poster) {
            return res.status(404).json({
                success: false,
                message: "Poster not found",
            });
        }

        res.status(200).json({
            success: true,
            message: `Poster ${status} successfully`,
            data: poster,
        });

    } catch (error) {
        console.error("Update Status Error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const addPoster = async (req, res) => {
    try {
        const {
            items,
            status,
            isLocked,
            createdAt,
        } = req.body;

        const posterData = {
            userId: req.user.userId,
            items,
            status: status || "pending",
            isLocked: isLocked || false,
            createdAt: createdAt || new Date(),
        };

        const existingPoster = await PosterModal.findOne({
            userId: req.user.userId,
        });

        if (existingPoster) {
            return res.status(409).json({
                success: false,
                message:
                    "One poster is already available. Delete it before adding another.",
            });
        }

        const poster = await PosterModal.create(posterData);

        res.status(200).json({
            success: true,
            message: "Poster saved successfully",
            data: poster,
        });

    } catch (error) {
        console.error("Poster Error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

const getPosterData = async (req, res) => {
    try {
        const poster = await PosterModal
            .findOne({ userId: req.user.userId })
            .populate("items.productId")
            .populate("userId", "email");

        if (!poster) {
            return res.status(404).json({
                success: false,
                message: "Poster not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Poster fetched successfully",
            data: poster,
        });

    } catch (error) {
        console.error("Get Poster Error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

const getAllPosterData = async (req, res) => {
    try {
        const poster = await PosterModal
            .find()
            .populate("items.productId")
            .populate("userId", "email");

        if (!poster) {
            return res.status(404).json({
                success: false,
                message: "Poster not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Poster fetched successfully",
            data: poster,
        });

    } catch (error) {
        console.error("Get Poster Error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const deletePoster = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Poster ID is required",
            });
        }

        const poster = await PosterModal.findOneAndDelete({
            _id: id,
            userId: req.user.userId,
        });

        if (!poster) {
            return res.status(404).json({
                success: false,
                message: "Poster not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Poster deleted successfully",
        });

    } catch (error) {
        console.error("Delete Poster Error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    updateStatus,
    addPoster,
    getPosterData,
    getAllPosterData,
    deletePoster,
};