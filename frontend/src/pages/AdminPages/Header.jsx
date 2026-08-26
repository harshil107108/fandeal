import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-white shadow-md border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/admin/products"
                    className="text-2xl font-bold text-gray-900"
                >
                    Fan<span className="text-blue-600">Deal</span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-2">
                    <NavLink
                        to="/admin/products"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg font-medium transition ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`
                        }
                    >
                        Products
                    </NavLink>

                    <NavLink
                        to="/admin/addproduct"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg font-medium transition ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`
                        }
                    >
                        Add Product
                    </NavLink>

                    <NavLink
                        to="/admin/posterReview"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg font-medium transition ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`
                        }
                    >
                        Post Review
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;