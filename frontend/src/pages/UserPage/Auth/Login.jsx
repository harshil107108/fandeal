import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setErrorMessage("");
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await axios.post(
                "http://localhost:8080/auth/login",
                data
            );

            const susscess = response.data.success;


            if (susscess) {
                localStorage.setItem(
                    "token",
                    response.data.token
                );

                navigate("/");
            }


        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Unable to login. Please try again."
            );
            console.error(
                "Login Error:",
                error.response?.data?.message || error.message
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your FanDeal account
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleLogin}>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {errorMessage && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <span className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => { navigate("/signup") }}>
                        Sign Up
                    </span>
                </p>

            </div>
        </div>
    );
};

export default Login;