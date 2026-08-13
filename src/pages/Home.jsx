import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import ExpenseForm from "../components/ExpenseForm"
import ExpenseList from "../components/ExpenseList"
import Summary from "../components/Summary"
import Filter from "../components/Filter"
import ExpenseChart from "../components/ExpenseChart"

function Home() {
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses")

    return storedExpenses
      ? JSON.parse(storedExpenses)
      : []
  })

  const [category, setCategory] = useState("All")
  const [date, setDate] = useState("")
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [search, setSearch] = useState("")
  const [editingExpense, setEditingExpense] = useState(null)

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    )
  }, [expenses])

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      expense,
    ])
  }

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter(
        (expense) => expense.id !== id
      )
    )
  }

  const editExpense = (expense) => {
    setEditingExpense(expense)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const updateExpense = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    )

    setEditingExpense(null)
  }

  const filteredExpenses = expenses
    .filter((expense) => {
      const searchText = search.toLowerCase()

      const matchesSearch =
        expense.category
          .toLowerCase()
          .includes(searchText) ||
        expense.note
          .toLowerCase()
          .includes(searchText) ||
        expense.date.includes(searchText) ||
        expense.amount
          .toString()
          .includes(searchText)

      if (!matchesSearch) {
        return false
      }

      if (
        category !== "All" &&
        expense.category !== category
      ) {
        return false
      }

      if (
        date &&
        expense.date !== date
      ) {
        return false
      }

      if (
        minAmount &&
        Number(expense.amount) < Number(minAmount)
      ) {
        return false
      }

      if (
        maxAmount &&
        Number(expense.amount) > Number(maxAmount)
      ) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      if (sortBy === "highest") {
        return (
          Number(b.amount) -
          Number(a.amount)
        )
      }

      return (
        new Date(b.date) -
        new Date(a.date)
      )
    })

  const clearFilters = () => {
    setSearch("")
    setCategory("All")
    setDate("")
    setMinAmount("")
    setMaxAmount("")
    setSortBy("recent")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Manage your daily spending
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-1">
            Expense Dashboard
          </h2>
        </div>

        
        <Summary expenses={expenses} />

        
        <ExpenseChart expenses={expenses} />

       
        <ExpenseForm
          onAddExpense={addExpense}
          editingExpense={editingExpense}
          onUpdateExpense={updateExpense}
        />

        
        <Filter
          category={category}
          setCategory={setCategory}
          date={date}
          setDate={setDate}
          minAmount={minAmount}
          setMinAmount={setMinAmount}
          maxAmount={maxAmount}
          setMaxAmount={setMaxAmount}
          sortBy={sortBy}
          setSortBy={setSortBy}
          search={search}
          setSearch={setSearch}
          onClear={clearFilters}
        />

        
        <ExpenseList
          expenses={filteredExpenses}
          onDelete={deleteExpense}
          onEdit={editExpense}
        />

      </main>
    </div>
  )
}

export default Home