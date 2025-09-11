export const ExpenseTable = ({ expenses, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-5 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Notes</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
            {expenses.filter(Boolean).map((exp, idx) => (
            <tr key={exp?._id ?? `temp-${idx}`} className="border-t">
                <td className="px-4 py-2">
                {exp?.date
                    ? new Date(exp.date).toLocaleDateString("en-GB",{
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit"
                    })
                    : exp?.createdAt
                    ? new Date(exp.createdAt).toLocaleDateString("en-GB",{
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit"
                    })
                    : "N/A"}
                </td>
                <td className="px-4 py-2">{exp?.category || "N/A"}</td>
                <td className="px-4 py-2">{exp?.title || "N/A"}</td>
                <td className="px-4 py-2">₹{exp?.amount ?? 0}</td>
                <td className="px-4 py-2">{exp?.notes || "-"}</td>
                <td className="px-4 py-2 text-center">
                <button
                    className="border px-2 py-1 rounded-lg border-indigo-600 text-indigo-600 
                    hover:bg-indigo-600 hover:text-white transition"
                    onClick={() => onEdit(exp)}
                >
                    Edit
                </button>
                <button
                    className="border px-2 py-1 rounded-lg ml-5 border-red-600 text-red-600
                    hover:bg-red-600 hover:text-white transition"
                    onClick={() => onDelete(exp?._id)}
                >
                    Delete
                </button>
                </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
