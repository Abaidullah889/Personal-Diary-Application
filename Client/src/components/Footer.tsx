

export function Footer() {
  return (
    <footer className="bg-gray-200">
      <div className="max-w-4xl mx-auto px-2 py-2">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Brand/Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold font-['Playfair_Display'] text-gray-900">
              Diary
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600 text-sm">
              Personal Journal
            </span>
          </div>
          {/* Copyright */}
          <div className="text-gray-500 text-sm text-center md:text-right">
            <p>© 2024 Personal Diary</p>           
          </div>
        </div>
        
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-200/10 via-transparent to-gray-200/10 pointer-events-none"></div>
      </div>
    </footer>
  )
}