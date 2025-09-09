import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleNavClick = (path) => {
    navigate(path)
    setIsOpen(false) // close menu after clicking
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login", { replace: true }) // replace history so back button won't work
  }

  return (
    <header className="bg-indigo-600 text-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => handleNavClick("/dashboard")}
        >
          SpendWise
        </h1>

        {/* Navlinks (desktop) */}
        <nav className="space-x-10 hidden md:flex text-lg font-semibold">
          <button onClick={() => handleNavClick("/dashboard")} className="hover:text-gray-300">Dashboard</button>
          <button onClick={() => handleNavClick("/expenses")} className="hover:text-gray-300">Expenses</button>
          <button onClick={() => handleNavClick("/reports")} className="hover:text-gray-300">Reports</button>
          <button onClick={() => handleNavClick("/profile")} className="hover:text-gray-300">Profile</button>
        </nav>

        {/* Logout (desktop) */}
        <button
          className="bg-white text-indigo-600 rounded-lg px-4 py-2 font-semibold hover:bg-gray-200 hidden md:block"
          onClick={handleLogout}
        >
          Logout
        </button>

        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-2 bg-indigo-700 px-6 py-4">
          <button onClick={() => handleNavClick("/dashboard")} className="hover:text-gray-300">Dashboard</button>
          <button onClick={() => handleNavClick("/expenses")} className="hover:text-gray-300">Expenses</button>
          <button onClick={() => handleNavClick("/reports")} className="hover:text-gray-300">Reports</button>
          <button onClick={() => handleNavClick("/profile")} className="hover:text-gray-300">Profile</button>
          <button
            onClick={handleLogout}
            className="bg-white text-indigo-600 rounded-lg px-4 py-2 font-semibold hover:bg-gray-200 mt-2"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  )
}
