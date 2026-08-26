const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const ProductModal = require("./modals/Product")
const UserModal = require("./modals/User")
const PosterModal = require("./modals/Poster")
const upload = require("./config/multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoose
    .connect("mongodb://127.0.0.1:27017/fandeal")
    .then(() => {
        console.log("DB Connected");
    })
    .catch((error) => {
        console.error("DB not connected:", error);
    });

//product Add
app.post("/product/addEdit", upload.single("image"), async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            imageUrl: `/uploads/products/${req.file.filename}`,
        };

        const product = await ProductModal.create(productData);

        res.status(200).json({
            success: true,
            message: "Product added successfully",
            data: product,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

app.post("/product/getProductData", async (req, res) => {
    try {
        const {
            category
        } = req.body;
        const product = await ProductModal.find({
            category
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
        });

    } catch (error) {
        console.error("Get Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});


//user

app.post("/auth/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        const user = await UserModal.create(userData);

        res.status(201).json({
            success: true,
            message: "User added successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

//poster

app.put("/poster/updateStatus", async (req, res) => {
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
            {
                status: status,
                isLocked: status === "approved",
            },
            {
                new: true,
            }
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
});

app.post("/poster/addEdit", async (req, res) => {
    try {
        const {
            userId,
            items,
            status,
            isLocked,
            createdAt,
        } = req.body;

        const posterData = {
            // userId,
            items,
            status: status || "pending",
            isLocked: isLocked || false,
            createdAt: createdAt || new Date(),
        };

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
});

app.get("/poster/getPosterData", async (req, res) => {
    try {
        const poster = await PosterModal
            .findOne({})
            .populate("items.productId");

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
});

app.get("/poster/getAllPosterData", async (req, res) => {
    try {
        const poster = await PosterModal
            .find()
            .populate("items.productId");

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
});


app.post("/poster/delete", async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Poster ID is required",
            });
        }

        const poster = await PosterModal.findByIdAndDelete(id);

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
});

app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModal.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            "secretkey",
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

app.listen(8080, () => {
    console.log("port running on 8080")
})