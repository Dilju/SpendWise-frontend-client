import { useState } from "react"
import { API } from "../utils/api"
import { useNavigate } from "react-router-dom"



export const Login = () =>  {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        try{
            const res = await API.post("http://localhost:3050/auth/login", {email, password})

            //store token in local storage
            localStorage.setItem("token", res.data.token)

            // alert("Login sucessful!")
               
            navigate("/dashboard")
        } catch(err){
            console.error(err);
            alert(err.response?.data?.message || "Login failed")   
        } finally{
            setLoading(false)
        }

    }

    return(
        <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100">
            <div className="border bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
                {/* Login Title */}
                <h2 className="text-center text-3xl font-bold text-indigo-600 mb-6">Welcome Back</h2>

                {/* Form */}
                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Email</label>
                        <input type="email" placeholder="Enter your email"
                        className="border w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-bold text-gray-700 mb-1">Password</label>
                        <input type="password" placeholder="Enter your password"
                        className="border w-full border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-500 outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    {/* Login Button */}
                    <button type="submit"
                    disabled = {loading}
                    onClick={handleSubmit}
                    className="border w-full py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition">
                    {loading ? "Logging in..." : "Log In"}</button>
                </form>


                {/* Link to Sign Up */}
                <p className="text-center mt-5 text-gray-600 text-sm">Don't have an account? {" "} <a href="/signup"
                className="font-medium text-indigo-600 hover:underline transition"
                >Sign Up</a></p>

            </div>
        </div>
    )
}
