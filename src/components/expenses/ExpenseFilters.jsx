import { useState } from "react"

export const ExpenseFilters = ({ onApply, onReset }) => {
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("")
  const [maxAmount, setMaxAmount] = useState("")

  const handleApply = () => {
    onApply({ date, category, maxAmount })
  }

  const handleReset = () => {
    setDate("")
    setCategory("")
    setMaxAmount("")
    onReset()
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-semibold mb-4">Filters</h3>

      <div className="flex flex-col gap-4">
        {/* Date */}
        <input
          type="date"
          value={date}
          className="border p-2 rounded-lg w-full"
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Category */}
        <div className="w-full">
          <input
            list="categories"
            placeholder="Choose or type category"
            className="border w-full rounded-lg p-2 px-4"
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
        </div>

        {/* Max Amount */}
        <input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          className="border rounded-lg px-3 py-2 w-full"
          onChange={(e) => setMaxAmount(e.target.value)}
        />

        {/* Buttons side by side */}
        <div className="flex gap-4">
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-800 hover:shadow-lg transition w-full"
            onClick={handleApply}
          >
            Apply
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg shadow hover:bg-gray-500 hover:text-white hover:shadow-lg transition w-full"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
