export const Table = ({ expenses = [] }) => {
     if (!expenses || expenses.length === 0) {
        return (
            <div className="text-center text-gray-500 py-6">
                No expenses found
            </div>
        )
    }

     // ✅ Sort by date (newest first)
    const sortedExpenses = [...expenses].sort((a, b) => {
        const dateA = new Date(a.date || a.createdAt).getTime()
        const dateB = new Date(b.date || b.createdAt).getTime()
        return dateB - dateA // newest first
    })
    
    return (
        <table className="w-full text-left border-collapse bg-white mt-5 rounded-lg shadow-lg">
            <thead>
                <tr className="border-b">
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Notes</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((exp, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2"> {exp?.date
                        ? new Date(exp.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit"
                        })
                        :exp?.createdAt
                        ? new Date(exp.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit"
                        })
                        :"N/A"}</td>
                        <td className="px-4 py-2">{exp.category}</td>
                        <td className="px-4 py-2 font-semibold">₹{exp.amount}</td>
                        <td className="px-4 py-2">{exp.notes || "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
