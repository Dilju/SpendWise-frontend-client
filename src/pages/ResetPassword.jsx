import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API } from "../utils/api"

export const ResetPassword = () => {
    const {token} = useParams()
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setMessage("")

        try{
            const res = await API.post(`/auth/reset-password/${token}`, {password})
            setMessage(res.data.message)
            setTimeout(() => navigate("/login", 2000))
        } catch(err){   
            setMessage(err.response?.data?.message || "Something went wrong")
        }
    }
    return(
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <div className=" bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-indigo-600 py-2">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Enter New password"
                        value={password}
                        className="border w-full px-4 py-2 rounded-lg outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Reset password
                    </button>
                </form>
                {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
            </div>
        </div>
    )
}