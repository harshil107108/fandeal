const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

const requireAuth = (req, res, next) => {
    const authorization = req.headers.authorization;

    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : null;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required",
        });
    }

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = requireAuth;