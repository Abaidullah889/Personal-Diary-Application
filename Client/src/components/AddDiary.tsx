import { Link } from "react-router";
import { Card } from "./ui/card"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface ValidationErrors {
  title?: string;
  content?: string;
}

export function AddDiary() {
  
  // Form state
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Mutation to create new diary entry
  const createMutation = useMutation({
    mutationFn: async (newEntry: { title: string; content: string }) => {
      const response = await fetch("http://127.0.0.1:8000/api/Diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });


      return response.json();
    },



    onSuccess: () => {
      
      // Redirect to diary page
      window.location.href = "/diary";
    },
  });

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
    
    // Basic approach - check if any errors exist
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

    // Trigger the mutation to create new diary entry
    createMutation.mutate({
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
            Add New Diary Entry
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Capture your thoughts and experiences in a new diary entry
          </p>
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
                disabled={createMutation.isPending}
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
                disabled={createMutation.isPending}
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
                  disabled={createMutation.isPending}
                  className="px-6 py-3 bg-gray-800 hover:bg-black text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="flex items-center">
                    {createMutation.isPending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Entry
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </form>
        </Card>

        {/* Writing Tips Card */}
        <Card className="bg-gray-50/90 backdrop-blur-xl border-gray-200/50 shadow-lg rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Writing Tips</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              Write freely and authentically - this is your personal space
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              Include details about your feelings, thoughts, and experiences
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              Don't worry about perfect grammar - focus on expressing yourself
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              Consider what you learned or how you grew from today's experiences
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}