import { Link } from "react-router";
import { Card } from "./ui/card"
import { useQuery } from "@tanstack/react-query";

export interface DiaryEntry {
  id: number;
  title: string;
  date?: string;
  created_at?: string; 
  updated_at?: string; 
  content: string;
}

export function MainPage() {


  // Fetch Data 
  const { 
    data: diaryEntries = [], 
    isLoading, 
    isError, 
    error 
  } = useQuery<DiaryEntry[]>({
    queryKey: ["diary"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/api/Diary");
      
      if (!response.ok) {
        throw new Error("Failed to fetch diary entries");
      }
      
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 10 * 60 * 1000,   // Garbage collect after 10 minutes
  });

  
  const totalEntries = diaryEntries.length;
  
  // Helper function to get date from entry (handle both date and created_at)
  const getEntryDate = (entry: DiaryEntry): string => {
    return entry.date || entry.created_at || new Date().toISOString();
  };

  // Get date range if entries exist
  const dates = diaryEntries
    .map(entry => getEntryDate(entry))
    .sort();
  
  const earliestDate = dates.length > 0 ? dates[0] : null;
  const latestDate = dates.length > 0 ? dates[dates.length - 1] : null;

  // Format dates for display (DD-MM-YYYY)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen px-4 pt-20 pb-10 border-0">
        <div className="max-w-4xl mx-auto space-y-8 border-0">
         
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold font-['Playfair_Display'] text-white mb-4">
              Welcome to My Personal Diary
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover my thoughts, experiences, and daily reflections captured through time.
            </p>
          </div>

          {/* Loading */}
          <Card className="bg-gray-100/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl p-8">
            <div className="text-center space-y-4">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded-md w-64 mx-auto mb-4"></div>
                <div className="h-6 bg-gray-300 rounded-md w-96 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-300 rounded-md w-80 mx-auto"></div>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600 mt-6">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading your diary entries...</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen px-4 pt-20 pb-10 border-0">
        <div className="max-w-4xl mx-auto space-y-8 border-0">
          
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold font-['Playfair_Display'] text-white mb-4">
              Welcome to My Personal Diary
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover my thoughts, experiences, and daily reflections captured through time.
            </p>
          </div>

          {/* Error State */}
          <Card className="bg-red-50/95 backdrop-blur-xl border-red-200 shadow-2xl rounded-3xl p-8">
            <div className="text-center space-y-4">
              <div className="text-red-600 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-red-800">
                Unable to Load Diary Entries
              </h2>
              <p className="text-red-600">
                {error instanceof Error ? error.message : "An unexpected error occurred"}
              </p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pt-20 pb-10 border-0">
      <div className="max-w-4xl mx-auto space-y-8 border-0">
        
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold font-['Playfair_Display'] text-white mb-4">
            Welcome to My Personal Diary
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover my thoughts, experiences, and daily reflections captured through time. 
            Each entry tells a story of moments that shaped my journey.
          </p>
        </div>

        <Card className="bg-transparent border-0" >
          <img
            src="/Diary_2.png"
            alt="Diary illustration"
            className="w-full h-auto"
          />
        </Card>
        
        {/* Stats Section - Dynamic Data */}
        <Card className="bg-gray-100/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl p-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold font-['Playfair_Display'] text-gray-900">
              My Journey So Far
            </h2>
            
            {totalEntries > 0 ? (
              <>
                <div className="text-lg text-gray-600">
                  <span className="font-semibold text-gray-900">{totalEntries} entries</span>
                  {earliestDate && latestDate && (
                    <>
                      {" "}between{" "}
                      <span className="font-semibold text-gray-900">{formatDate(earliestDate)}</span> and{" "}
                      <span className="font-semibold text-gray-900">{formatDate(latestDate)}</span>
                    </>
                  )}
                </div>
                <p className="text-gray-500 mt-4">
                  Explore my thoughts and experiences through carefully crafted diary entries
                </p>
              </>
            ) : (
              <>
                <div className="text-lg text-gray-600">
                  <span className="font-semibold text-gray-900">No entries yet</span>
                </div>
                <p className="text-gray-500 mt-4">
                  Start your journey by creating your first diary entry
                </p>
              </>
            )}

            {/* Real-time Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-300">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{totalEntries}</div>
                <div className="text-sm text-gray-600">Total Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {diaryEntries.reduce((total, entry) => total + entry.content.split(' ').length, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Words</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {latestDate ? Math.ceil((Date.now() - new Date(latestDate).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                </div>
                <div className="text-sm text-gray-600">Days Since Last Entry</div>
              </div>
            </div>
          </div>
        </Card>

        
        <Card className="bg-gray-50/95 backdrop-blur-xl border-0 shadow-lg rounded-3xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Latest Entries
          </h3>
          
          {diaryEntries.length > 0 ? (
            <div className="space-y-4">
              {diaryEntries
                .sort((a, b) => {
                  // Sort by latest date (created_at or date field)
                  const dateA = new Date(getEntryDate(a)).getTime();
                  const dateB = new Date(getEntryDate(b)).getTime();
                  return dateB - dateA; // Latest first
                })
                .slice(0, 3) // Get top 3 entries
                .map((entry, index) => (
                  <div key={entry.id} className="border-l-4 border-gray-400 pl-4 hover:border-gray-600 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {entry.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(getEntryDate(entry))}
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {entry.content.length > 120 
                            ? entry.content.substring(0, 120) + "..." 
                            : entry.content
                          }
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-600 rounded-full text-sm font-semibold">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">No diary entries yet</h4>
              <p className="text-gray-500 mb-4">Start documenting your thoughts and experiences</p>
              <Link
                to="/add"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Entry
              </Link>
            </div>
          )}
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <Link
            to="/Diary"
            className="inline-flex items-center px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl mr-4"
          >
            {totalEntries > 0 ? "Browse My Diary" : "View All Entries"}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}