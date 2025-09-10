
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Footer } from "../components/Footer"

export const Home = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="font-sans bg-gray-100 text-gray-900">
      {/* NavBar */}
      <header className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          {/* Logo */}
          <h1
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            SpendWise
          </h1>

          {/* Desktop navlinks */}
          <nav className="space-x-9 text-lg font-light hidden md:flex">
            <a href="#" className="hover:text-indigo-600 transition mt-3">
              Home
            </a>
            <a href="#features" className="hover:text-indigo-600 transition mt-3">
              Features
            </a>
            <a
              onClick={() => navigate("/login")}
              className="hover:text-indigo-600 transition cursor-pointer mt-3"
            >
              Login
            </a>
            <a
              onClick={() => navigate("/signup")}
              className="border-2 border-black px-4 py-2 rounded-lg hover:border-indigo-600 hover:text-white hover:bg-indigo-600 transition cursor-pointer"
            >
              Sign Up
            </a>
          </nav>

          {/* Hamburger button (only on mobile) */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile navlinks */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-2 bg-indigo-50 px-6 py-4 shadow-md">
            <a href="#" className="hover:text-indigo-600 transition">
              Home
            </a>
            <a href="#features" className="hover:text-indigo-600 transition">
              Features
            </a>
            <button
              onClick={() => {
                navigate("/login")
                setIsOpen(false)
              }}
              className="hover:text-indigo-600 text-left"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/signup")
                setIsOpen(false)
              }}
              className="border-2 border-black px-4 py-2 rounded-lg hover:border-indigo-600 hover:text-white hover:bg-indigo-600 transition text-left"
            >
              Sign Up
            </button>
          </div>
        )}
      </header>

      {/* Hero section */}
      <section className="bg-gray-50 pt-32 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-grey-800">
          Take Control of Your Expense with{" "}
          <span className="text-indigo-600">SpendWise</span>
        </h1>
        <p className="mt-8 text-lg text-grey-600 max-w-5xl mx-auto">
          Track, Analyze, and Manage your personal finance effortlessly. Your
          smart expense companion for a stress-free future.
        </p>
        <div className="mt-8 flex justify-center space-x-9">
          <a
            href="/signup"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started
          </a>
          <a
            href="#features"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-100 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features, How it works, CTA, Footer (unchanged) */}
      {/* Features section */}
        <section id='features' className='bg-white py-15'>
            <div className='max-w-7xl mx-auto px-6 text-center'>
            <h className='text-3xl md:text-4xl font-bold text-gray-800'>Powerful Features to Manage Your Money</h>
            <p className='mt-4 text-gray-700 max-w-2xl mx-auto'><span className='font-bold'>SpendWise</span> gives you the right tools to stay in control of your expenses and savings.</p>

            {/* Features card grid */}
            <div className='mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4'>
                {/* Feature 1 */}
                <div className='bg-gray-100 p-6 rounded-3xl shadow hover:shadow-lg transition'>
                <div className='text-indigo-600 text-4xl mb-4'>💸</div>
                <h3 className='text-xl font-semibold text-gray-800'>Track Expense</h3>
                <p className='mt-2 text-gray-600'>Easily record daily spending and categorize your expenses.</p>
                </div>
                
                {/* Feature 2 */}
                <div className='bg-gray-100 p-6 rounded-3xl shadow hover:shadow-lg transition'>
                <div className='text-indigo-600 text-4xl mb-4'>📊</div>
                <h3 className='text-xl font-semibold text-gray-900'>Visual Reports</h3>
                <p className='mt-2 text-gray-600'>Get insights with beautiful charts and reports of your finances.</p>
                </div>
                
                {/* Feature 3 */}
                <div className='bg-gray-100 p-6 rounded-3xl shadow hover:shadow-lg transition'>
                <div className='text-indigo-600 text-4xl mb-4'>⏰</div>
                <h3 className='text-xl font-semibold text-gray-900'>Smart Reminders</h3>
                <p className='mt-2 text-gray-600'>Never miss recording an expense with daily reminders.</p>
                </div>
                
                {/* Feature 4 */}
                <div className='bg-gray-100 p-6 rounded-3xl shadow hover:shadow-lg transition'>
                <div className='text-indigo-600 text-4xl mb-4'>🔒</div>
                <h3 className='text-xl font-semibold text-gray-900'>Secure & Private</h3>
                <p className='mt-2 text-gray-600'>Your financial data is always safe and encrypted.</p>
                </div>
            </div>
            </div>
        </section>
        


        
        
        {/* How it works section */}
        <section className='py-20 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-6 text-center'>    {/* add background color for easier understanding bg-red-400 */}
            <h3 className='text-3xl font-bold mb-10'>How Its Works</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>

            <div className='p-6 border rounded-2xl shadow-md'>
                <h4 className='text-xl font-semibold mb-2'>1️⃣ Sign Up</h4>
                <p className='text-gray-600'>Create your free SpendWise account.</p>
            </div>

            <div className='p-6 border rounded-2xl shadow-md'>
                <h4 className='text-xl font-semibold mb-2'>2️⃣ Add Expenses</h4>
                <p className='text-gray-600'>Record your daily spending with ease.</p>
            </div>

            <div className='p-6 border rounded-2xl shadow-md'>
                <h4 className='text-xl font-semibold mb-2'>3️⃣ View Reports & Save</h4>
                <p className='text-gray-600'>Analyze, cut, costs, and boost savings.</p>
            </div>
            </div>
        </div>
        </section>



        {/* Call to action banner */}
        <section className='py-16 bg-indigo-600 text-white text-center'>
        <h3 className='text-3xl font-bold mb-5'>Join thousands taking charge of their finances.</h3>
        <button 
        onClick={() => navigate("/signup")}
        className='bg-white text-indigo-600 px-6 py-3 rounded-2xl text-lg font-medium hover:bg-gray-200 transition hover:text-indigo-800'
        >Sign Up Free</button>
        </section>



      
      <Footer />
    </div>
  )
}


