import { useState } from "react"
export const ReportFilter = ({ onFilter, categories = []}) => {
    const [month, setMonth] = useState("")
    const [category, setCategory] = useState("")
    
    const handleFilter = () => {
        onFilter({ month, category})
    }


    const handleReset = () => {
        setMonth("")
        setCategory("")
        onFilter({month: "", category: ""})
    }
    
    return(
        <div>

            {/* month filter */}
            <div className="bg-white p-4 shadow rounded-lg mb-6 flex flex-wrap gap-5 items-center">
                <label className="block text-sm text-gray-600 font-semibold">Month</label>
                <input 
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
                />
            </div>

            {/* category filter */}
            <div className="bg-white p-4 rounded-lg mb-6 flex flex-wrap gap-5 items-center shadow">
                <label className="block text-sm text-gray-600 font-semibold">Category</label>
                <input 
                    list="category" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="border w-full rounded-lg px-3 py-2" 
                    placeholder="Choose or type category"
                />

                <datalist id="category">
                    {categories.map((cat, i) => (
                        <option key={i} value={cat}/>
                    ))}
                </datalist>
            </div>

            {/* Apply button */}
            <button onClick={handleFilter} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 hover:shadow-lg transition"
            >Apply</button>

            {/* Reset button */}
            <button
                onClick={handleReset}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition ml-4"
                >Reset
            </button>
        </div>
    )
}