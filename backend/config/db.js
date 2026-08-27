const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fandeal"
        );

        console.log("DB Connected");

    } catch (error) {
        console.error("DB not connected:", error);
        process.exit(1);
    }
};

module.exports = connectDB;