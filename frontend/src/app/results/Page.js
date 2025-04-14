"use client"; // This directive tells Next.js that this component should be rendered on the client side

import { useEffect, useState } from "react";
import Link from "next/link";

// Component definition (should ideally be PascalCase e.g. Page)
const Page = () => {
  // State to hold the result data retrieved from localStorage
  const [data, setData] = useState(null);

  // useEffect runs once after the component mounts
  useEffect(() => {
    // Get the result data from localStorage
    const result = localStorage.getItem("result");
    
    // If result exists, parse the JSON and set it to state
    if (result) {
      setData(JSON.parse(result));
    }

    // Debug log to see the raw result string
    console.log("Data from local storage: ", result);
  }, []);

  // If data has not yet been loaded, show a loading message
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
        <svg
          className="animate-spin h-8 w-8 text-blue-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
        <p>Fetching results...</p>
      </div>
    );
  }
  

  // Render the page content once data is available
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Page heading */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Upload Result
      </h1>

      {/* Result content box */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-lg p-6 space-y-6">
        
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <p className="text-gray-900 dark:text-white">{data.fullName}</p>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Age : {data.age}
          </label>
        </div>

        {/* Extracted Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Extracted Text
          </label>
          <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
            {data.rawText}
          </p>
        </div>

        {/* Back button */}
        <div className="pt-4 text-center">
          <Link href="/" passHref>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Back to Upload
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default Page;
