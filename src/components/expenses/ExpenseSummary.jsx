export const ExpenseSummary = ({expenses}) => {
    const safeExpenses = Array.isArray(expenses) ? expenses : []

    const total = safeExpenses.reduce((sum, exp) => sum + (Number(exp?.amount) || 0), 0)
    const count = safeExpenses.length

    const topCategory = count > 0 ? safeExpenses.reduce((prev, curr) =>
            (Number(prev?.amount) || 0) > (Number(curr?.amount) || 0) ? prev : curr 
            )?.category || "N/A" : "N/A"
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <h3 className="text-gray-600 text-sm">Total spent</h3>
                <p className="text-xl font-bold text-gray-800">₹{total}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <h3 className="text-gray-600 text-sm">Transactions</h3>
                <p className="text-xl font-bold text-gray-800">{count}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <h3 className="text-gray-600 text-sm">Top Category</h3>
                <p className="text-xl font-bold text-gray-800">{topCategory}</p>
            </div>
        </div>
    )
}