
import { Link, NavLink } from "react-router-dom"


const UserHeader = () => {
    return (
        <header className="bg-white shadow-md border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link
                    to="/admin/products"
                    className="text-2xl font-bold text-gray-900"
                >
                    Fan<span className="text-blue-600">Deal</span>
                </Link>

                <nav className="flex items-center gap-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg font-medium transition ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/poster"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg font-medium transition ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`
                        }
                    >
                        Poster
                    </NavLink>

                </nav>
            </div>
        </header>
    )
}

export default UserHeader