import { useState } from "react"
import { API } from "../utils/api"
import { useNavigate } from "react-router-dom"

export const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        try{
            const res = await API.post("/auth/register", {name, email, password})

            alert(res.data.message)
            
            // store token and redirect automatically
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userData", JSON.stringify(res.data.user))
            navigate("/dashboard")
        } catch(err){
            console.error(err);
            alert(err.response?.data?.message || "Signup failed")
        } finally{
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Create an Account</h2>

                {/* Form */}
                <form className="space-y-5">
                    {/* Full name */}
                    <div> 
                        <label className="block text-gray-700 font-bold mb-1">Full Name</label>
                        <input type="text" placeholder="Enter your full name" 
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-indigo-500 outline-none"
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                    </div>

                    
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-1">Email</label>
                        <input type="email" placeholder="Enter your email"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-indigo-500 outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-1">Password</label>
                        <input type="password" placeholder="Enter your password"
                        className="border w-full border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-indigo-500 outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>

                    {/* Submit button */}
                    <button type="submit" 
                    className="border w-full py-2 rounded-lg bg-indigo-500 text-white font-bold hover:bg-indigo-700 transition"
                    disabled = {loading}
                    onClick={handleSubmit}
                    >{loading ? "Signing Up..." : "Sign Up"}</button>

                    {/* Link to login */}
                    <p className="text-center text-gray-600 text-sm mt-5">Already have an account?{" "}
                        <a href="/login" className="text-indigo-600 font-medium hover:underline transition">Log In</a>
</p>
                </form>
            </div>
        </div>
    )
}