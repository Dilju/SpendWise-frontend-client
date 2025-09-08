import { useNavigate } from "react-router-dom"
import { useState } from "react"
export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <header className="bg-indigo-600 text-white shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>SpendWise</h1>

                {/* Navlinks */}
                <nav className="space-x-10 hidden md:flex text-lg font-semibold">
                    <button onClick={() => navigate("/dashboard")} className="hover:text-gray-300 transition">Dashboard</button>
                    <button onClick={() => navigate("/expenses")} className="hover:text-gray-300 transition">Expenses</button>
                    <button onClick={() => navigate("/reports")} className="hover:text-gray-300 transition">Reports</button>
                    <button onClick={() => navigate("/profile")} className="hover:text-gray-300 transition">Profile</button>
                </nav>

                {/* Logout */}
                <button className="bg-white text-indigo-600 rounded-lg px-4 py-2 font-semibold hover:bg-gray-200" onClick={() => navigate("/login")}>Logout</button>

                {/* Hamburger button */}
                <button className="md:hidden text-2xl focus:outline-none" onClick={() => setIsOpen(!isOpen)}>☰</button>
            </div>

            {isOpen && (
                <div className="md:hidden flex flex-col space-y-2 mt-2 bg-indigo-700 px-6 py-4">
                    <button onClick={() => navigate("/dashboard")} className="hover:text-gray-300">Dashboard</button>
                    <button onClick={() => navigate("/expenses")} className="hover:text-gray-300">Expenses</button>
                    <button onClick={() => navigate("/reports")} className="hover:text-gray-300">Reports</button>
                    <button onClick={() => navigate("/profile")} className="hover:text-gray-300">Profile</button>
                </div>
            )}
        </header>
    )
}