const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModal = require("../modals/User");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            email,
            password: hashedPassword,
        };

        const user = await UserModal.create(userData);

        res.status(201).json({
            success: true,
            message: "User added successfully",
            data: {
                id: user._id,
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
};

const login = async (req, res) => {
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
            JWT_SECRET,
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
};

module.exports = {
    signup,
    login,
};