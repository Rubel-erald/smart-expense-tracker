import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
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

  const categoryColors = {
    Food: "#3B82F6",
    Travel: "#22C55E",
    Bills: "#F59E0B",
    Others: "#EF4444",
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
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
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.category}
                    fill={
                      categoryColors[entry.category]
                    }
                  />
                ))}
              </Pie>

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