import { PieChart, Pie, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Cell } from "recharts"

export const ReportCharts = ({expenses}) => {
    if(!expenses || expenses.length === 0){
        return (
            <div>No Data available for the selected filters</div>
        )
    }

    // Group by category
    const categoryData = Object.values(
        expenses.reduce((acc, exp) => {
            acc[exp.category] = acc[exp.category] || {name: exp.category, value:0}
            acc[exp.category].value += exp.amount
            return acc
        }, {})
    )

    // Group by date 
    const dailyData = Object.values(
        expenses.reduce((acc,exp) => {
            const cleanDate = exp.date ? exp.date.slice(0, 10) : exp.createdAt.slice(0, 10)

            acc[cleanDate] = acc[cleanDate] || {date: cleanDate, amount:0}
            acc[cleanDate].amount += exp.amount
            return acc
        }, {})
    )

    const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#3B82F6"]

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-0">
            {/* Pie chart-expense by category */}
            <div className="bg-white p-4 rounded-lg shadow mt-4 overflow-hidden relative z-0">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Expense by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Bar chart */}
            <div className="bg-white p-4 rounded-lg shadow mt-4 relative z-0">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Expense Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="amount" fill="#6366F1"/>
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    )
}