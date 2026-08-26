import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const hanldeCreateAccount = async (e) => {
        e.preventDefault()
        const response = await axios.post(
            "http://localhost:8080/auth/signup",
            data
        );

        if (response?.status) {
            navigate('/login');
        }
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };



    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create your FanDeal account
                    </p>
                </div>

                <form className="space-y-5">

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

                    <button
                        onClick={hanldeCreateAccount}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Create Account
                    </button>



                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                        Login
                    </span>
                </p>


            </div>
        </div>
    );
};

export default Signup;