function ExpenseList({ expenses, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          Recent Expenses
        </h2>

        <span className="text-sm text-gray-500">
          {expenses.length} expense
          {expenses.length !== 1 ? "s" : ""}
        </span>
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No expenses found.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-gray-800">
                    ₹{Number(expense.amount).toFixed(2)}
                  </h3>

                  <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {expense.category}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {expense.date}
                </p>

                {expense.note && (
                  <p className="text-sm text-gray-600 mt-2">
                    {expense.note}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(expense)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(expense.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExpenseList