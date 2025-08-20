import { useState } from "react";
import { useWindows } from "../contexts/WindowContext";

export default function Taskbar() {
  const { windows, focusWindow, minimizeWindow } = useWindows();
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  // Show all windows (minimized and not)
  const openedWindows = windows;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-[#202124] flex items-center px-3 z-50 border-t border-gray-800 shadow-lg">
      {/* Windows Button */}
      <button
        className="w-11 h-11 rounded-lg hover:bg-[#2d2f31] flex items-center justify-center mr-3"
        onClick={() => setShowMenu((v) => !v)}
        aria-label="Open Start Menu"
      >
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#2563eb" />
          <path
            d="M10 10h13v13H10V10zm0 15h13v13H10V25zm15-15h13v13H25V10zm0 15h13v13H25V25z"
            fill="#fff"
          />
        </svg>
      </button>
      {/* Start Menu (simple) */}
      {showMenu && (
        <div className="absolute bottom-16 left-3 bg-white rounded-lg shadow-2xl w-64 p-4 z-50 animate-slideIn">
          <div className="font-semibold text-gray-700 mb-2">Start Menu</div>
          <div className="text-gray-500 text-sm">
            You can add shortcuts here.
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full h-10 pl-10 pr-4 rounded-full bg-[#292a2d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Type here to search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Opened Apps (including minimized) */}
      <div className="flex items-center ml-4 space-x-2">
        {openedWindows.map((win) => (
          <button
            key={win.id}
            className={`flex items-center px-3 py-1 rounded-lg transition-colors relative group
              ${
                win.isMinimized
                  ? "bg-[#35363a] opacity-70"
                  : win.zIndex === Math.max(...windows.map((w) => w.zIndex))
                  ? "bg-[#2563eb] text-white"
                  : "bg-[#292a2d] text-gray-200"
              }
              hover:bg-[#2563eb] hover:text-white`}
            onClick={() => {
              if (win.isMinimized) {
                // Restore window
                focusWindow(win.id);
                minimizeWindow(win.id); // This should toggle isMinimized to false
              } else {
                focusWindow(win.id);
              }
            }}
            title={win.title}
          >
            {/* Optional: App icon or dot */}
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-sm truncate max-w-[100px]">{win.title}</span>
            {/* Minimized icon overlay */}
            {win.isMinimized && (
              <span className="absolute right-1 bottom-1">
                <svg width="14" height="14" viewBox="0 0 16 16">
                  <rect x="3" y="11" width="10" height="2" rx="1" fill="#fff" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
