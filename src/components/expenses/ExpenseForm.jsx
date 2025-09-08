import { useEffect, useState } from "react"

export const ExpenseForm = ({ onClose, onSave, initialData }) => {
   const [formData, setFormData] = useState({
    date: "",
    category: "",
    title: "",
    amount: "",
    notes: ""
   })

    // prefil for editing
    useEffect(() => {
        if(initialData){
            setFormData({
                date: initialData.date || "",
                category: initialData.category || "",
                title: initialData.title || "",
                amount: initialData.amount || "",
                notes: initialData.notes || ""
            })
        }
    }, [initialData])

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({ ...prev, [name]: value}))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="w-full max-w-lg bg-white p-6 rounded shadow-lg">
                <h3 className="text-xl font-bold mb-4">{initialData ? "Edit Expense" : "Add Expense"}</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input 
                        type="date" 
                        name="date"
                        value={formData.date} 
                        onChange={handleChange}
                        className="border px-3 py-2 rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category ?? ""}
                        onChange={(e) =>
                            setFormData((prev) => ({
                            ...prev,
                            category: e.target.value
                            }))
                        }
                        list="category-options"
                        className="w-full border px-3 py-2 rounded-lg"
                        required
                    />

                    <datalist id="category-options">
                        <option value="Food" />
                        <option value="Transport" />
                        <option value="Shopping" />
                        <option value="Bills" />
                        <option value="Entertainment" />
                        <option value="Health" />
                        <option value="Other" />
                    </datalist>
                    
                    <input 
                        type="text" 
                        name="title"
                        value={formData.title}
                        placeholder="Title" 
                        className="border w-full px-3 py-2 rounded-lg"
                        onChange={handleChange}
                        required
                    />

                    <input 
                        type="number"
                        name="amount"
                        value={formData.amount} 
                        placeholder="Amount" 
                        className="border w-full px-3 py-2 rounded-lg"
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="notes" 
                        placeholder="Notes" 
                        value={formData.notes}
                        className="border w-full px-3 py-2 rounded-lg"
                        onChange={handleChange}
                    ></textarea>

                    <div className="flex justify-end gap-5">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="border-2 px-4 py-2 rounded-lg border-red-500 text-red-600 font-semibold
                            hover:bg-red-500 hover:text-white transition"
                        >Cancel</button> 
                        
                        <button 
                            type="submit"
                            className="border-2 px-4 py-2 rounded-lg border-green-600 text-green-700 font-semibold
                            hover:bg-green-600 hover:text-white transition"
                        >{initialData ? "Update" : "Save"}</button>    
                    </div>                    
                </form>
            </div>
        </div>
    )
}