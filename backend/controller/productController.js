const ProductModal = require("../modals/Product");

const addEditProduct = async (req, res) => {
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
};

const getProductData = async (req, res) => {
    try {
        const { category } = req.body;

        const product = await ProductModal.find({
            category,
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
};

module.exports = {
    addEditProduct,
    getProductData,
};