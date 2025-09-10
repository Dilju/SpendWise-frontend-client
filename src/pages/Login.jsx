import { useState } from "react"
import { API } from "../utils/api"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../utils/validateEmail"

export const Login = () =>  {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")   // 🔹 to show error msg

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("") 

        // ✅ Frontend email validation
        if (!validateEmail(email)) {
            setError("Please enter a valid email address")
            return
        }

        setLoading(true)

        try{
            const res = await API.post("/auth/login", {email, password})
            localStorage.setItem("token", res.data.token)
            navigate("/dashboard")
        } catch(err){
            console.error(err)
            setError(err.response?.data?.message || "Login failed")
        } finally{
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100">
            <div className="border bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
                <h2 className="text-center text-3xl font-bold text-indigo-600 mb-6">Welcome Back</h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Email</label>
                        <input 
                          type="text" 
                          placeholder="Enter your email"
                          className="border w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" 
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Password</label>
                        <input 
                          type="password" 
                          placeholder="Enter your password"
                          className="border w-full border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-500 outline-none"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline">Forgot Password?</Link>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button 
                      type="submit"
                      disabled={loading}
                      className="border w-full py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition">
                      {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p className="text-center mt-5 text-gray-600 text-sm">
                  Don't have an account?{" "} 
                  <a href="/signup" className="font-medium text-indigo-600 hover:underline transition">Sign Up</a>
                </p>
            </div>
        </div>
    )
}
