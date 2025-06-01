"use client";

import { useState } from "react";

export default function ChromeApp() {
  const [url, setUrl] = useState("https://grocto-frontend.onrender.com/");

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputUrl = url.trim();
    if (!/^https?:\/\//i.test(inputUrl)) {
      inputUrl = "https://" + inputUrl;
    }
    setUrl(inputUrl);
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-900">
      <form onSubmit={handleSubmit} className="flex p-2 bg-gray-800">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-2 py-1 rounded-l bg-gray-700 text-white outline-none"
        />
        <button
          type="submit"
          className="px-4 py-1 bg-blue-600 text-white rounded-r hover:bg-blue-700"
        >
          Go
        </button>
      </form>
      <iframe
        src={url}
        title="Chrome"
        className="flex-1 w-full"
        style={{ border: "none" }}
      />
    </div>
  );
}
