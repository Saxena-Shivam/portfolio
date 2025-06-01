"use client"

import { useState } from "react"
import { FolderOpen, File, ImageIcon, Music, Video, ArrowLeft, Home, Search } from "lucide-react"

export default function FileManagerApp() {
  const [currentPath, setCurrentPath] = useState("/home/user")
  const [selectedItem, setSelectedItem] = useState(null)

  const folders = [
    { name: "Documents", type: "folder", icon: FolderOpen },
    { name: "Downloads", type: "folder", icon: FolderOpen },
    { name: "Pictures", type: "folder", icon: FolderOpen },
    { name: "Music", type: "folder", icon: FolderOpen },
    { name: "Videos", type: "folder", icon: FolderOpen },
    { name: "Desktop", type: "folder", icon: FolderOpen },
  ]

  const files = [
    { name: "resume.pdf", type: "file", icon: File, size: "245 KB" },
    { name: "portfolio.jpg", type: "image", icon: ImageIcon, size: "1.2 MB" },
    { name: "presentation.pptx", type: "file", icon: File, size: "3.4 MB" },
    { name: "song.mp3", type: "audio", icon: Music, size: "4.1 MB" },
    { name: "demo.mp4", type: "video", icon: Video, size: "15.2 MB" },
  ]

  const allItems = [...folders, ...files]

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Home className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Path Bar */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="text-sm text-gray-600">{currentPath}</div>
      </div>

      {/* File Grid */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {allItems.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                selectedItem === item.name ? "bg-blue-100 ring-2 ring-blue-500" : "hover:shadow-md"
              }`}
              onClick={() => setSelectedItem(item.name)}
              onDoubleClick={() => {
                if (item.type === "folder") {
                  setCurrentPath(`${currentPath}/${item.name}`)
                }
              }}
            >
              <div className="flex flex-col items-center text-center">
                <item.icon
                  className={`w-12 h-12 mb-2 ${
                    item.type === "folder"
                      ? "text-blue-500"
                      : item.type === "image"
                        ? "text-green-500"
                        : item.type === "audio"
                          ? "text-purple-500"
                          : item.type === "video"
                            ? "text-red-500"
                            : "text-gray-500"
                  }`}
                />
                <div className="text-sm font-medium text-gray-800 truncate w-full">{item.name}</div>
                {item.type !== "folder" && <div className="text-xs text-gray-500 mt-1">{item.size}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
        {allItems.length} items
        {selectedItem && ` • ${selectedItem} selected`}
      </div>
    </div>
  )
}
