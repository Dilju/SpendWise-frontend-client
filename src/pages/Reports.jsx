import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import { ReportCharts } from "../components/reports/ReportCharts"
import { ReportFilter } from "../components/reports/ReportFilter"
import { data } from "react-router-dom"
import { ReportSummary } from "../components/reports/ReportSummary"
import { Table } from "../components/Table"
import { ReportExportBtn } from "../components/reports/ReportExportBtn"
import { API } from "../utils/api"

export const Reports = () => {
    const [expenses, setExpenses] = useState([])
    const [filteredExpenses, setFilteredExpenses] = useState(expenses)
    const [loading, setLoading] = useState(false)


    //fetch expenses from backend
    useEffect(() => {
        const fetchExpenses = async() => {
            try{
                setLoading(true)
                const res = await API.get("/api/expenses")
                const sorted = (res.data.expenses || [])
                    .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
                setExpenses(sorted)
                setFilteredExpenses(sorted)
            } catch(error){
                console.error("Failed to fetch expenses: ", error)
                alert("Failed to load expenses")                
            } finally{
                setLoading(false)
            }
        }
        fetchExpenses()
    }, [])

    // filter by month and category
    const handleFilter = ({ month, category }) => {
        let filtered = expenses

        if (month) {
             filtered = filtered.filter(exp => exp.date?.slice(0, 7) === month || exp.createdAt?.slice(0, 7) === month)
        }
        if (category) {
            filtered = filtered.filter(exp => exp.category === category)
        }
        filtered = filtered.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))

        setFilteredExpenses(filtered)
    }


    //unique categories for filter
    const categories = [ ...new Set(expenses.map(exp => exp.category))]

    return(
        <div className="min-h-screen bg-gray-100">
            <Navbar/>

            <div className="pt-24 p-6 max-w-7xl mx-auto">
                {/* Header */}
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Reports</h3>

                {/* Report Filters */}
                <ReportFilter onFilter={handleFilter} categories={categories}/>

                {/* Report summary */}
                <ReportSummary expenses = {filteredExpenses}/>

                {/* Report Charts */}
                <ReportCharts expenses={filteredExpenses}/>

                {/* Report Export */}
                <ReportExportBtn expenses={filteredExpenses}/>

                {/* Table */}
                <Table expenses={filteredExpenses}/>

            </div>
        </div>
    )
}