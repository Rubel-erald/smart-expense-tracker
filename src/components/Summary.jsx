function Summary({ expenses }) {
  const totalExpense = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  )

  const categoryTotals = expenses.reduce(
    (totals, expense) => {
      const category = expense.category

      totals[category] =
        (totals[category] || 0) +
        Number(expense.amount)

      return totals
    },
    {}
  )

  const categories = [
    "Food",
    "Travel",
    "Bills",
    "Others",
  ]

  return (
    <div className="mt-6">

      {/* Total Expense */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <p className="text-sm text-gray-500">
          Total Expenses
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
          ₹{totalExpense.toFixed(2)}
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          {expenses.length} transaction
          {expenses.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Category Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">

        {categories.map((category) => (
          <div
            key={category}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
          >
            <p className="text-sm text-gray-500">
              {category}
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-2">
              ₹
              {(categoryTotals[category] || 0).toFixed(
                2
              )}
            </h3>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Summary