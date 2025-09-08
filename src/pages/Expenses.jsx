import { ExpenseFilters } from "../components/expenses/ExpenseFilters"
import { ExpenseForm } from "../components/expenses/ExpenseForm"
import { ExpenseSummary } from "../components/expenses/ExpenseSummary"
import { ExpenseTable } from "../components/expenses/ExpenseTable"
import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react"
import { API } from "../utils/api"
// import { searchForWorkspaceRoot } from "vite"

export const Expenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [allExpenses, setAllExpenses] = useState([])  // keep original list for filters
  const [loading, setLoading] = useState(false)

  // fetch all expenses
  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const res = await API.get("/api/expenses")
      const sorted = (res.data.expenses || []).sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
      setExpenses(sorted)
      setAllExpenses(sorted)
    } catch (error) {
      console.error(error)
      alert("Failed to fetch expenses")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  // add new expense
  const handleAddExpense = async (expense) => {
    try {
      const res = await API.post("/api/expenses", expense)
      const newList = [...expenses, res.data.expense].sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
      setExpenses(newList)
      setAllExpenses(newList)
      setIsModalOpen(false)
      alert("Expense added successfully")
    } catch (error) {
      console.error(error)
      alert("Failed to add expense")
    }
  }

  // delete expense
  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return

    try {
      await API.delete(`/api/expenses/${id}`)
      setExpenses(prev => prev.filter(exp => exp._id !== id))
      setAllExpenses(prev => prev.filter(exp => exp._id !== id))
    } catch (error) {
      console.error(error)
      alert("Failed to delete expense")
    }
  }

  //open modal with expense data
  const handleEditClick = (expense) => {
    setEditingExpense(expense)
    setIsModalOpen(true)  
  }

  // update expense
  const handleUpdateExpense = async (id, updatedExpense) => {
    try {
      const res = await API.put(`/api/expenses/${id}`, updatedExpense)
      const newList = expenses.map(exp => exp._id === id ? res.data.expense : exp)
        .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
      setExpenses(newList)
      setAllExpenses(newList)

      setEditingExpense(null)
      setIsModalOpen(false)
      alert("Expense updated successfully")
    } catch (error) {
      console.error(error)
      alert("Failed to update expense")
    }
  }



  // apply filters
  const handleFilterExpenses = ({date, category, maxAmount}) => {
    let filtered = [ ...allExpenses]

    if(date) {
      filtered = filtered.filter(exp => exp.date?.startsWith(date))
    }
    if(category) {
      filtered = filtered.filter(exp => exp.category?.toLowerCase() === category.toLowerCase())
    }
    if(maxAmount) {
      filtered = filtered.filter(exp => Number(exp.amount) <= Number(maxAmount))
    }
    filtered = filtered.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
    setExpenses(filtered)
  }

  // reset filteres
  const handleResetFilters = () => {
    setExpenses(allExpenses)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-24 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Expenses</h2>
          <button
            onClick={() => {setEditingExpense(null); setIsModalOpen(true)}}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 hover:shadow-lg"
          >
            + Add Expense
          </button>
        </div>

        {/* Expense Filters */}
        <ExpenseFilters onApply={handleFilterExpenses} onReset={handleResetFilters}/>

        {/* Loading / Data */}
        {loading ? (
          <p className="text-center text-gray-500">Loading expenses...</p>
        ) : (
          <>
            <ExpenseSummary expenses={expenses} />
            <ExpenseTable 
              expenses={expenses} 
              onDelete={handleDeleteExpense}
              // onUpdate={handleUpdateExpense}
              onEdit={handleEditClick}
            />
          </>
        )}
      </div>

      {/* Modal for Add Expense */}
      {isModalOpen && (
        <ExpenseForm
          onClose={() => {setIsModalOpen(false) ; setEditingExpense(null)}}
          onSave={ editingExpense 
            ? (data) => handleUpdateExpense(editingExpense._id, data)
            : handleAddExpense}
          initialData = {editingExpense}
        />
      )}
    </div>
  )
}
