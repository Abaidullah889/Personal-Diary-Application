import { Link } from "react-router";
import { Card } from "./ui/card"
import { useParams } from 'react-router'
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface DiaryEntry {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface ValidationErrors {
  title?: string;
  content?: string;
}

export function EditDiary() {
  const params = useParams();
  const diaryId = Number(params.id);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Query to fetch diary entry
  const {
    isPending,
    isError,
    data: diaryEntry,
    error,
  } = useQuery<DiaryEntry>({
    queryKey: ["diary", diaryId],
    queryFn: async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/Diary/${diaryId}`);
      
      const diaryData = await response.json();
      
      // Set form values after data is loaded
      setTitle(diaryData.title || "");
      setContent(diaryData.content || "");
      
      return diaryData;
    },
  });

  // Mutation to update diary entry
  const updateMutation = useMutation({
    mutationFn: async (updatedEntry: { title: string; content: string }) => {
      const response = await fetch(`http://127.0.0.1:8000/api/Diary/${diaryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEntry),
      });


      return response.json();
    },


    onSuccess: (updatedData) => {
      
      
      console.log("Diary entry updated successfully:", updatedData);
      
      // Redirect to diary page
      window.location.href = "/Diary";
    },

    onError: (error) => {
      console.error("Failed to update diary entry:", error);
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
          <p className="text-white">Loading diary entry...</p>
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
            Back to Diary
          </Link>
        </div>
      </div>
    );
  }

  // If diary entry not found
  if (!diaryEntry) {
    return (
      <div className="min-h-screen px-4 pt-20 pb-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Diary Entry Not Found</h1>
          <p className="text-gray-300 mb-8">The diary entry you're looking for doesn't exist.</p>
          <Link 
            to="/diary" 
            className="px-6 py-3 bg-gray-800 hover:bg-black text-white font-semibold rounded-full transition-all duration-200"
          >
            Back to Diary
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

  // Custom validation function
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    } else if (content.trim().length < 10) {
      newErrors.content = "Content must be at least 10 characters long";
    }

    setErrors(newErrors);
    
    if (newErrors.title || newErrors.content) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Trigger the mutation to update the diary entry
    updateMutation.mutate({
      title: title.trim(),
      content: content.trim(),
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
 
  };

  return (
    <div className="min-h-screen px-4 pt-20 pb-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-white mb-4">
            Edit Diary Entry
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Update your thoughts and experiences
          </p>
          <div className="text-gray-400 text-sm">
            Originally created on {formatDate(diaryEntry.created_at)}
          </div>
        </div>

        {/* Form Card */}
        <Card className="bg-gray-100/95 backdrop-blur-xl border-gray-300/50 shadow-2xl rounded-3xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Title Field */}
            <div className="space-y-2">
              <label 
                htmlFor="title" 
                className="block text-lg font-semibold text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter a title for your diary entry..."
                className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                  errors.title 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-gray-500'
                }`}
                disabled={updateMutation.isPending}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.title}
                </p>
              )}
            </div>

            {/* Content Field */}
            <div className="space-y-2">
              <label 
                htmlFor="content" 
                className="block text-lg font-semibold text-gray-900"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={handleContentChange}
                placeholder="Write your diary entry here... Share your thoughts, experiences, and reflections."
                rows={12}
                className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-vertical ${
                  errors.content 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-gray-500'
                }`}
                disabled={updateMutation.isPending}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.content}
                </p>
              )}
            </div>

            {/* Character Count */}
            <div className="text-right text-sm text-gray-600">
              Title: {title.length} characters | Content: {content.length} characters
            </div>

           

            {/* Form Actions */}
            <div className="pt-6 border-t border-gray-300">
              {/* Cancel and Save Buttons */}
              <div className="flex justify-end space-x-4">
                <Link 
                  to="/diary"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 no-underline"
                >
                  Cancel
                </Link>
                
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="px-6 py-3 bg-gray-800 hover:bg-black text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="flex items-center">
                    {updateMutation.isPending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Update Entry
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </form>
        </Card>

        {/* Edit Info Card */}
        <Card className="bg-gray-50/90 backdrop-blur-xl border-gray-200/50 shadow-lg rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Editing Tips</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              Feel free to add new thoughts or refine your original ideas
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              The original creation date will be preserved
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              Your changes are saved when you click "Update Entry"
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}