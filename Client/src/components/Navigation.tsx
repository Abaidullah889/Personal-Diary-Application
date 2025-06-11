import { Link } from "react-router"
import { Card } from "./ui/card"

export function Navigation() {
  return (
    <nav className="z-50 sticky top-1 mx-auto max-w-4xl px-4 py-4">
      <Card className="bg-gray-100/95 backdrop-blur-xl border-gray-300/50 shadow-2xl rounded-full p-0 overflow-hidden">
        <div className="flex items-center justify-between h-16 px-8">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold font-['Playfair_Display'] text-gray-900 tracking-tight hover:text-gray-700 transition-all duration-200 cursor-pointer transform hover:scale-105 active:scale-95"
            >
              Diary
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              to="/Diary"
              className="relative px-6 py-2.5 text-gray-600 hover:text-black transition-all duration-200 rounded-full hover:bg-gray-300/80 group transform hover:scale-102 active:scale-95"
            >
              <span className="relative z-10 font-semibold">Diary</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400/40 to-gray-300/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            <Link
              to="/about"
              className="relative px-6 py-2.5 text-gray-600 hover:text-black transition-all duration-200 rounded-full hover:bg-gray-300/80 group transform hover:scale-102 active:scale-95"
            >
              <span className="relative z-10 font-semibold">About</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400/40 to-gray-300/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
          </div>
        </div>
        
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-200/20 via-transparent to-gray-200/20 pointer-events-none"></div>
      </Card>
    </nav>
  )
}