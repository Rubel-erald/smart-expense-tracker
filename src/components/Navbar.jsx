function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Smart Expense Tracker
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Track your spending smartly
            </p>
          </div>

          <div className="hidden sm:block">
            <span className="text-sm text-gray-500">
              Expense Manager
            </span>
          </div>

        </div>

      </div>
    </nav>
  )
}

export default Navbar