"use client";

import { useState, useEffect } from "react";
import { useDesktop } from "../contexts/DesktopContext";
import { useWindows } from "../contexts/WindowContext";
import SpotifyApp from "./apps/SpotifyApp";
import CodeEditorApp from "./apps/CodeEditorApp";

export default function DesktopIcons() {
  const { desktopItems, createFolder, deleteItem, renameItem, moveItem } =
    useDesktop();
  const { openWindow } = useWindows();
  const [contextMenu, setContextMenu] = useState(null);
  const [isRenaming, setIsRenaming] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setContextMenu(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleRightClick = (e, itemId) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, itemId });
  };

  const handleDoubleClick = (item) => {
    if (item.type === "app") {
      switch (item.id) {
        case "chrome":
          window.open("https://google.com", "_blank");
          break;
        case "vscode":
          openWindow("code", "VS Code", <CodeEditorApp />);
          break;
        case "github":
          window.open("https://github.com/Saxena-Shivam", "_blank");
          break;
        case "spotify":
          openWindow("spotify", "Spotify", <SpotifyApp />);
          break;
        default:
          break;
      }
    } else if (item.type === "folder") {
      openWindow(
        "files",
        "Files",
        <div className="p-4">Folder: {item.name}</div>
      );
    }
  };

  const handleCreateFolder = () => {
    const position = contextMenu
      ? { x: contextMenu.x - 100, y: contextMenu.y - 100 }
      : { x: 1200, y: 600 };
    createFolder("New Folder", position);
    setContextMenu(null);
  };

  // Responsive: grid for mobile/tablet, absolute for desktop
  return (
    <>
      {/* Desktop: absolute icons */}
      <div
        className="absolute inset-0 hidden sm:block"
        onContextMenu={(e) => handleRightClick(e)}
      >
        {desktopItems.map((item) => (
          <div
            key={item.id}
            className="absolute flex flex-col items-center cursor-pointer group select-none"
            style={{
              left: item.position.x - 32,
              top: item.position.y,
              width: 80,
              zIndex: 10,
            }}
            onDoubleClick={() => handleDoubleClick(item)}
            onContextMenu={(e) => handleRightClick(e, item.id)}
            draggable
            onDragEnd={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              moveItem(item.id, {
                x: e.clientX - rect.width / 2,
                y: e.clientY - rect.height / 2,
              });
            }}
          >
            <div className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20">
              {item.icon.startsWith("http") ? (
                <img
                  src={item.icon || "/placeholder.svg"}
                  alt={item.name}
                  className="w-10 h-10"
                />
              ) : (
                <span className="text-3xl">{item.icon}</span>
              )}
            </div>
            {isRenaming === item.id ? (
              <input
                type="text"
                defaultValue={item.name}
                className="text-white text-xs mt-4 text-center max-w-20 bg-black/50 rounded px-1"
                onBlur={(e) => {
                  renameItem(item.id, e.target.value);
                  setIsRenaming(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    renameItem(item.id, e.currentTarget.value);
                    setIsRenaming(null);
                  }
                }}
                autoFocus
              />
            ) : (
              <span className="text-white text-xs mt-4 text-center max-w-20 group-hover:text-blue-200 transition-colors drop-shadow-lg">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Mobile/Tablet: grid at top */}
      <div className="sm:hidden w-full absolute top-12 left-0 flex flex-wrap justify-center gap-2 px-2 z-30">
        {desktopItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center cursor-pointer group select-none"
            style={{
              width: 64,
            }}
            onDoubleClick={() => handleDoubleClick(item)}
            onContextMenu={(e) => handleRightClick(e, item.id)}
          >
            <div className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20">
              {item.icon.startsWith("http") ? (
                <img
                  src={item.icon || "/placeholder.svg"}
                  alt={item.name}
                  className="w-8 h-8"
                />
              ) : (
                <span className="text-2xl">{item.icon}</span>
              )}
            </div>
            {isRenaming === item.id ? (
              <input
                type="text"
                defaultValue={item.name}
                className="text-white text-xs mt-2 text-center max-w-16 bg-black/50 rounded px-1"
                onBlur={(e) => {
                  renameItem(item.id, e.target.value);
                  setIsRenaming(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    renameItem(item.id, e.currentTarget.value);
                    setIsRenaming(null);
                  }
                }}
                autoFocus
              />
            ) : (
              <span className="text-white text-xs mt-2 text-center max-w-16 group-hover:text-blue-200 transition-colors drop-shadow-lg">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Context Menu (unchanged) */}
      {contextMenu && (
        <div
          className="fixed bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-2 z-50 min-w-48 animate-slideIn"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onMouseLeave={() => setContextMenu(null)}
        >
          {contextMenu.itemId ? (
            <>
              <button
                onClick={() => {
                  setIsRenaming(contextMenu.itemId);
                  setContextMenu(null);
                }}
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors"
              >
                Rename
              </button>
              <button
                onClick={() => {
                  deleteItem(contextMenu.itemId);
                  setContextMenu(null);
                }}
                className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 transition-colors"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCreateFolder}
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors"
              >
                New Folder
              </button>
              <button
                onClick={() => {
                  // Create file functionality
                  setContextMenu(null);
                }}
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors"
              >
                New File
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
