import { Link } from "react-router";
import { Card } from "./ui/card"
import { useQuery } from "@tanstack/react-query";

// TypeScript interface for diary entry
export interface DiaryEntry {
  id: number;
  title: string;
  updated_at?: string;
  created_at: string;
  content: string;
}

export function DiaryPage() {
  const {
    isPending,
    isError,
    data: diaryEntries,
    error,
  } = useQuery<DiaryEntry[]>({
    queryKey: ["diary"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/api/Diary");
      const diaryEntries = await response.json();
      return diaryEntries;
    },
  });

  // Loading state
  if (isPending) {
    return (
      <div className="min-h-screen px-4 pt-20 pb-10 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-white mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white">Loading diary entries...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen px-4 pt-20 pb-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Error Loading Diary</h1>
          <p className="text-gray-300 mb-8">Error: {error?.message}</p>
          <Link 
            to="/diary" 
            className="px-6 py-3 bg-gray-800 hover:bg-black text-white font-semibold rounded-full transition-all duration-200"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  // Format dates for display (DD-MM-YYYY)
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Sort entries by date (newest first)
  const sortedEntries = [...(diaryEntries || [])].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="min-h-screen px-4 pt-20 pb-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-white mb-4">
            My Diary
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A collection of my thoughts, experiences, and daily reflections
          </p>
        </div>

        {/* New Entry Button */}
        <div className="flex justify-center">
          <Link
            to="/diary/add"
            className="inline-flex items-center px-6 py-3 bg-gray-100/95 border-gray-300/50 text-black font-semibold rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Diary Entry
          </Link>
        </div>

        {/* Diary Entries */}
        <Card className="bg-gray-100/95 backdrop-blur-xl border-gray-300/50 shadow-2xl rounded-3xl p-8">
          <div className="space-y-8">
            {sortedEntries.map((entry, index) => (
              <div key={entry.id}>
                {/* Entry Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold font-['Playfair_Display'] text-gray-900">
                      {entry.title}
                    </h2>
                    <Link 
                      to={`/diary/${entry.id}`} 
                      className="inline-flex items-center px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 text-sm font-medium rounded-full transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">                         
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />                      
                      </svg>                       
                      Edit                     
                    </Link> 
                  </div>
                  <div className="text-gray-600 font-medium">
                    {formatDate(entry.created_at)}
                  </div>
                </div>

                {/* Entry Content */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {entry.content}
                  </p>
                </div>

                {/* Horizontal Rule (except for last entry) */}
                {index < sortedEntries.length - 1 && (
                  <hr className="mt-8 border-gray-300" />
                )}
              </div>
            ))}

            {/* Empty State */}
            {sortedEntries.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No diary entries yet</h3>
                <p className="text-gray-500 mb-6">Start your journey by creating your first diary entry.</p>
                <Link
                  to="/diary/add"
                  className="inline-flex items-center px-6 py-3 bg-black border-gray-300/50 text-white font-semibold rounded-full transition-colors duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  Create First Entry
                </Link>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}