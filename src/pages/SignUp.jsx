import { useState } from "react"
import { API } from "../utils/api"
import { useNavigate } from "react-router-dom"
import { validateEmail } from "../utils/validateEmail"
import { Eye, EyeOff } from "lucide-react"   // ✅ eye toggle icons

export const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

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
            const res = await API.post("/auth/register", {name, email, password})
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userData", JSON.stringify(res.data.user))
            navigate("/dashboard")
        } catch(err){
            console.error(err)
            setError(err.response?.data?.message || "Signup failed")
        } finally{
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Create an Account</h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div> 
                        <label className="block text-gray-700 font-bold mb-1">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Enter your full name" 
                          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-indigo-500 outline-none"
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-1">Email</label>
                        <input 
                          type="email"
                          placeholder="Enter your email"
                          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-indigo-500 outline-none"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-gray-700 font-bold mb-1">Password</label>
                        <input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Enter your password"
                          className="border w-full border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-indigo-500 outline-none"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                    </div>

                    {/* Error */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Submit */}
                    <button 
                        type="submit" 
                        className="border w-full py-2 rounded-lg bg-indigo-500 text-white font-bold hover:bg-indigo-700 transition flex justify-center items-center gap-2"
                        disabled={loading}>
                        {loading && (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>

                    {/* Link to login */}
                    <p className="text-center text-gray-600 text-sm mt-5">
                      Already have an account?{" "}
                      <a href="/login" className="text-indigo-600 font-medium hover:underline transition">Log In</a>
                    </p>
                </form>
            </div>
        </div>
    )
}
