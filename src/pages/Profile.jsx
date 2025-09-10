import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import { API } from "../utils/api"

export const Profile = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({ name: "", email: "", monthlyIncome: 0 })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get("/auth/me")
                setUser(res.data)
                setFormData({
                    name: res.data.name,
                    // email: res.data.email,
                    monthlyIncome: res.data.monthlyIncome || 0
                })
            } catch (err) {
                setError(err.response?.data?.message || err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        try {
            const res = await API.put("/auth/me", formData)
            setUser(res.data.user)
            setEditMode(false)
        } catch (err) {
            alert(err.response?.data?.message || "Update failed")
        }
    }

    if (loading) return <p className="text-center pt-24">Loading ...</p>
    if (error) return <p className="text-center pt-24 text-red-500">{error}</p>

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-3xl mx-auto pt-24 p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Profile</h3>

                <div className="bg-white rounded-xl shadow-md p-6">
                    {editMode ? (
                        <>
                            <div className="mb-4">
                                <label className="text-gray-600 text-sm">Username</label>
                                <input 
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded-lg"
                                />
                            </div>

                            {/* <div className="mb-4">
                                <label className="text-gray-600 text-sm">Email</label>
                                <input 
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded-lg"
                                />
                            </div> */}

                            <div className="mb-4">
                                <label className="text-gray-600 text-sm">Monthly Income</label>
                                <input 
                                    type="number"
                                    name="monthlyIncome"
                                    value={formData.monthlyIncome}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded-lg"
                                />
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button 
                                    onClick={handleSave}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
                                >
                                    Save
                                </button>
                                <button 
                                    onClick={() => setEditMode(false)}
                                    className="border border-gray-400 px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-4">
                                <p className="text-gray-600 text-sm">Username</p>
                                <p className="font-semibold text-lg">{user.name}</p>
                            </div>

                            {/* <div className="mb-4">
                                <p className="text-gray-600 text-sm">Email</p>
                                <p className="font-semibold text-lg">{user.email}</p>
                            </div> */}

                            <div className="mb-4">
                                <p className="text-gray-600 text-sm">Monthly Income</p>
                                <p className="font-semibold text-lg">₹{user.monthlyIncome}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-600 text-sm">Joined Date</p>
                                <p className="font-semibold text-lg">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-600 text-sm">Last Login</p>
                                <p className="font-semibold text-lg">
                                    {user.lastLogin
                                        ? new Date(user.lastLogin).toLocaleString()
                                        : "Not available"}
                                </p>
                            </div>

                            <div className="flex justify-center items-center">
                                <button 
                                    onClick={() => setEditMode(true)}
                                    className="border-2 px-4 py-2 rounded-lg border-indigo-500 text-indigo-700 font-semibold shadow
                                    hover:text-white hover:bg-indigo-500 transition hover:shadow-lg"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
