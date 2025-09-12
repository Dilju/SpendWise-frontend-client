import { useEffect, useMemo, useState } from "react"
import { Card } from '../components/Card.jsx'
import { Chart } from '../components/Chart.jsx'
import { Footer } from '../components/Footer.jsx'
import { Navbar } from '../components/Navbar.jsx'
import { Table } from '../components/Table.jsx'
import { API } from "../utils/api.js"

export const Dashboard = () => {
  const [expenses, setExpenses] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ fetch expenses
        const expRes = await API.get("/api/expenses")
        setExpenses(expRes.data.expenses)

        // ✅ fetch logged-in user (with monthlyIncome)
        const userRes = await API.get("/auth/me")
        setUser(userRes.data)
      } catch (err) {
        console.error(err)
        alert("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const totalSpent = useMemo(
    () => expenses.reduce((sum, exp) => sum + exp.amount, 0),
    [expenses]
  )

  // ✅ use user.monthlyIncome (fallback to 0 if not yet loaded)
  const monthlyIncome = user?.monthlyIncome || 0
  const balance = monthlyIncome - totalSpent

  if (loading){
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const latestExpenses = [...expenses]
    .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
    .slice(0, 10)

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />

      {/* main content */}
      <div className='pt-20 px-3 sm:px-6 lg:px-12 max-w-7xl mx-auto'>
        <h2 className='text-2xl font-bold mb-6'>Dashboard Overview</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <Card title="Total Spent" value={`₹${totalSpent}`} />
          <Card title="Balance" value={`₹${balance}`} />
          <Card title="Monthly Income" value={`₹${monthlyIncome}`} />
        </div>

        {/* Chart section */}
        <div className='bg-white rounded-xl shadow-md p-6 mb-8'>
          <h3 className='text-xl font-semibold mb-4'>Spending Trends</h3>

          <div className="border-white shadow-lg rounded-lg p-4 mb-6">
            <h4 className="font-bold text-indigo-700 mb-2 text-center text-2xl">💡 50/30/20 Rule</h4>
            <p className="text-sm text-gray-800 pl-5">
              <span className="font-bold text-lg text-gray-700">Allocate your income wisely;</span>
              <br /> • <span className="font-bold text-indigo-800 text-lg">50%</span> for Needs (Food, Rent, Healthcare)
              <br /> • <span className="font-bold text-indigo-800 text-lg">30%</span> for Wants (Shopping, Entertainment)
              <br /> • <span className="font-bold text-indigo-800 text-lg">20%</span> for Savings & Investments
            </p>
          </div>
          <Chart expenses={expenses} />
        </div>

        {/* recent transaction table */}
        <div className='bg-white rounded-xl shadow-md p-6 mb-8'>
          <h3 className='text-xl font-semibold mb-4'>Recent Transactions</h3>
          <Table expenses={latestExpenses} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
