import { useState } from "react"
import { API } from "../utils/api"

export const ForgotPassword = () => {
    const [email, setEmail]  = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setMessage("")
        setLoading(true)

        try{
            const res = await API.post("/auth/forgot-password", {email})
            setMessage(`${res.data.message} (Check email or use this link: ${res.data.resetUrl})`)
        } catch(err){
            setMessage( err.response?.data?.message || "Something went wrong")
        } finally{
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-indigo-600 mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        className="border w-full rounded-lg px-4 py-2 outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-700 transition hover:shadow-lg"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send the reset link"}
                    </button>
                </form>
                {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
            </div>
        </div>
    ) 

}