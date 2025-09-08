// ReportSummary.jsx
export const ReportSummary = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        No expenses found for the selected filters.
      </div>
    )
  }

  // ✅ Total spent
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  // ✅ Group by category (accumulated total)
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount
    return acc
  }, {})

  // ✅ Find top category by total amount
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]

  // ✅ Calculate % contribution
  const topCategoryPercent = ((topCategory[1] / total) * 100).toFixed(1)

  // ✅ Average spend per transaction
  const avgSpend = (total / expenses.length).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 mt-6">
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <h3 className="text-gray-600 text-sm">Total Spent</h3>
        <p className="text-xl font-bold text-gray-800">₹{total}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <h3 className="text-gray-600 text-sm">Transactions</h3>
        <p className="text-xl font-bold text-gray-800">{expenses.length}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <h3 className="text-gray-600 text-sm">Top Category</h3>
        <p className="text-lg font-bold text-gray-800">{topCategory[0]}</p>
        <p className="text-sm text-gray-500">{topCategoryPercent}% of total</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <h3 className="text-gray-600 text-sm">Avg Spend</h3>
        <p className="text-xl font-bold text-gray-800">₹{avgSpend}</p>
      </div>
    </div>
  )
}
