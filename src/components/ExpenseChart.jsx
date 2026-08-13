import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

function ExpenseChart({ expenses }) {
  const categoryTotals = expenses.reduce((totals, expense) => {
    const category = expense.category

    totals[category] =
      (totals[category] || 0) + Number(expense.amount)

    return totals
  }, {})

  const chartData = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  )

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Category-wise Spending
      </h2>

      {chartData.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No expense data available for chart.
        </p>
      ) : (
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              />

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default ExpenseChart