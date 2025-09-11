import { ExpenseFilters } from "../components/expenses/ExpenseFilters"
import { ExpenseForm } from "../components/expenses/ExpenseForm"
import { ExpenseSummary } from "../components/expenses/ExpenseSummary"
import { ExpenseTable } from "../components/expenses/ExpenseTable"
import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react"
import { API } from "../utils/api"
import toast,{ Toaster } from "react-hot-toast"
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
      toast.error("Failed to fetch expenses")
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
    const newList = [...expenses, res.data.expense].sort(
      (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
    )
    setExpenses(newList)
    setAllExpenses(newList)
    setIsModalOpen(false)
    toast.success("Expense added successfully")
  } catch (error) {
    console.error(error)
    toast.error("Failed to add expense")
  }
}

  // delete expense
  const handleDeleteExpense = async (id) => {
    const confirm = await new Promise((resolve) => {
      toast(
        (t) => (
          <div className="flex flex-col gap-2 p-2">
            <span>Are you sure you want to delete this expense?</span>
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                onClick={() => { resolve(true); toast.dismiss(t.id)}}
                >Yes
              </button>

              <button
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                onClick={() => {resolve(false); toast.dismiss(t.id)}}
              >No</button>
            </div>
          </div>
        ),
        {duration: Infinity}
      )
    })
    
    
    
    if (!confirm) return

    try {
      await API.delete(`/api/expenses/${id}`)
      setExpenses(prev => prev.filter(exp => exp._id !== id))
      setAllExpenses(prev => prev.filter(exp => exp._id !== id))
      toast.success("Expense deleted successfully")
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete expense")
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
    const updated = res.data.expense
    const newList = expenses
      .map(exp => exp._id === id ? updated : exp)
      .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
    setExpenses(newList)
    setAllExpenses(newList)

    setEditingExpense(null)
    setIsModalOpen(false)
    toast.success("Expense updated successfully")
  } catch (error) {
    console.error(error)
    toast.error("Failed to update expense")
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

      <div className="pt-20 px-3 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h2 className="text-2xl sm:text-2xl font-bold text-gray-800">Expenses</h2>
          <button
            onClick={() => {setEditingExpense(null); setIsModalOpen(true)}}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 hover:shadow-lg w-full sm:w-auto"
          >
            + Add Expense
          </button>
        </div>

        

        {/* Loading / Data */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Expense Filters */}
            <ExpenseFilters 
              onApply={handleFilterExpenses} 
              onReset={handleResetFilters}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            />
            <ExpenseSummary 
              expenses={expenses} 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
            />
            <div className="overflow-x-auto">
              <ExpenseTable 
                expenses={expenses} 
                onDelete={handleDeleteExpense}
                // onUpdate={handleUpdateExpense}
                onEdit={handleEditClick}
              />
            </div>
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
