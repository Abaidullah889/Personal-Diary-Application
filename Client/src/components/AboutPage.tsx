import { Card } from "./ui/card"

export function AboutPage() {
  return (
    <div className="min-h-screen px-4 pt-20 pb-10 ">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl mt-4 font-bold font-['Playfair_Display'] text-white">
            About the Author
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get to know the person behind these diary entries
          </p>
        </div>

        {/* Author Details Card */}
        <Card className="bg-gray-100/95 backdrop-blur-xl border-gray-300/50 shadow-2xl rounded-3xl p-8">
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gray-500 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold font-['Playfair_Display'] text-gray-900">
                Abaidullah Asif
              </h2>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Full Name
                </label>
                <p className="text-lg text-gray-900 font-medium">
                  Abaidullah Asif
                </p>
              </div>

              {/* Neptun ID */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Neptun ID
                </label>
                <p className="text-lg text-gray-900 font-medium font-mono">
                  ZLWD2B
                </p>
              </div>

              {/* Email */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Email Address
                </label>
                <p className="text-lg text-gray-900 font-medium">
                  ubaidtech889@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-200/10 via-transparent to-gray-200/10 pointer-events-none"></div>
        </Card>
      </div>
    </div>
  )
}