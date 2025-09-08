import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const Chart = ({expenses}) => {

    // group expenses by month
    const monthlyData = expenses.reduce((acc, exp) => {
        const date = new Date(exp.date || exp.createdAt)
        const month = date.toLocaleString("en-IN", {month: "short", year: "numeric"})

        if(!acc[month]) acc[month] = 0
        acc[month] += exp.amount
        return acc
    }, {})

    // convert object into array for recharts
    const chartData = Object.entries(monthlyData).map(([month, total]) => ({
        month,
        total
    }))

    return (
       <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{top: 20, right: 30, left: 0, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip formatter={(value) => `₹${value}`}/>
                <Bar dataKey="total" fill="#6366F1" radius={[8, 8, 0, 0]}/>
            </BarChart>
       </ResponsiveContainer>
    )
}