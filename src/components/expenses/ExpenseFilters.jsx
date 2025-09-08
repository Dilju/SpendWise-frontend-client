import { useState } from "react"

export const ExpenseFilters = ({ onApply, onReset }) => {
    const [date, setDate] = useState("")
    const [category, setCategory] = useState("")
    const [maxAmount, setMaxAmount] = useState("")

    const handleApply = () => {
        onApply({ date, category, maxAmount})
    }

    const handleReset = () => {
        setDate("")
        setCategory("")
        setMaxAmount("")
        onReset()
    }

    return(
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="font-semibold mb-2">Filters</h3>
            <div>
                <input 
                    type="date"
                    value={date}
                    className="border p-2 rounded-lg"
                    onChange={(e) => setDate(e.target.value)}
                />
                <input list="categories" 
                    placeholder="Choose or type category" 
                    className="border w-64 rounded-lg p-2 px-4 ml-4"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <datalist id="categories">
                    <option value="Food" />
                    <option value="Transport" />
                    <option value="Shopping" />
                    <option value="Bills" />
                    <option value="Entertainment" />
                    <option value="Health" />
                    <option value="Other" />
                </datalist>

                <input 
                    type="number" 
                    placeholder="Max Amount" 
                    value={maxAmount}
                    className="border rounded-lg px-3 py-2 ml-4"
                    onChange={(e) => setMaxAmount(e.target.value)}
                />

                {/* apply button */}
                <button
                    className="bg-indigo-600 text-white px-4 py-2 ml-5 rounded-lg shadow hover:bg-indigo-800 hover:shadow-lg transition"
                    onClick={handleApply}
                >Apply</button>
                <button
                    className="bg-gray-300 ml-5 px-4 py-2 rounded-lg shadow hover:bg-gray-500 hover:text-white hover:shadow-lg transition"
                    onClick={handleReset}
                >Reset</button>
            </div>
        </div>
    )
}