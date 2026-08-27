const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/authMiddleware");

const {
    updateStatus,
    addPoster,
    getPosterData,
    getAllPosterData,
    deletePoster,
} = require("../controller/posterController");

router.put(
    "/updateStatus",
    updateStatus
);

router.post(
    "/addEdit",
    requireAuth,
    addPoster
);

router.get(
    "/getPosterData",
    requireAuth,
    getPosterData
);

router.get(
    "/getAllPosterData",
    getAllPosterData
);

router.post(
    "/delete",
    requireAuth,
    deletePoster
);

module.exports = router;