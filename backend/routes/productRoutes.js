const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
    addEditProduct,
    getProductData,
} = require("../controller/productController");

router.post(
    "/addEdit",
    upload.single("image"),
    addEditProduct
);

router.post(
    "/getProductData",
    getProductData
);

module.exports = router;