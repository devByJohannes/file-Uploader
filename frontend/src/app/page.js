"use client"; // Enables client-side rendering in Next.js app directory

import { useState } from "react"; 
import { useRouter } from "next/navigation"; // For client-side navigation

export default function Home() {
  // Local state for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    file: null,
  });

  const router = useRouter(); // Hook to programmatically navigate to another page

  // Handle changes for all input fields (text, date, and file)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input differently
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Prepare form data to send as multipart/form-data
    const formDataToSend = new FormData();
    for (let key in formData) {
      if (key === "file" && formData[key] === null) continue; // Skip empty file input
      formDataToSend.append(key, formData[key]);
    }

    // Send form data to backend API
    const res = await fetch("http://localhost:5001/api/upload", {
      method: "POST",
      body: formDataToSend,
    });

    // Parse response from backend
    const data = await res.json();

    // Store result and ID locally for later use (e.g. in results page)
    localStorage.setItem("result", JSON.stringify(data));
    localStorage.setItem("uploadId", data.id);

    console.log(data); // Debugging output

    // Redirect user to results page
    router.push("results");
  };

  return (
    // Form container
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow dark:bg-gray-800 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Upload Information
      </h1>

      <form onSubmit={handleSubmit}>
        {/* First Name Field */}
        <div className="mb-5">
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name Field */}
        <div className="mb-5">
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Doe"
            onChange={handleChange}
            required
          />
        </div>

        {/* Date of Birth Field */}
        <div className="mb-5">
          <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            required
          />
        </div>

        {/* File Upload Field */}
        <div className="mb-5">
          <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Upload File
          </label>
          <input
            type="file"
            name="file"
            id="file"
            accept=".pdf,image/*" // Restrict to PDF or image types
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 
              dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_help"
            onChange={handleChange}
            required
          />
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_help">
            PDF or image files are allowed for upload.
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
