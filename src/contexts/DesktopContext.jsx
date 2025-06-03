"use client";

import { createContext, useContext, useState } from "react";

const DesktopContext = createContext(undefined);

export function DesktopProvider({ children }) {
  const [desktopItems, setDesktopItems] = useState([
    {
      id: "chrome",
      name: "Google Chrome",
      type: "app",
      position: { x: 10, y: 100 },
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
    },
    {
      id: "vscode",
      name: "Visual Studio Code",
      type: "app",
      position: { x: 10, y: 200 },
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
    {
      id: "github",
      name: "GitHub Desktop",
      type: "app",
      position: { x: 10, y: 300 },
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      id: "spotify",
      name: "Spotify",
      type: "app",
      position: { x: 10, y: 400 },
      icon: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
    },
    {
      id: "documents",
      name: "Documents",
      type: "folder",
      position: { x: 10, y: 500 },
      icon: "📁",
      children: [],
    },
  ]);

  // Wallpaper state (default to wallpaper1.avif)
  const [wallpaper, setWallpaper] = useState(
    `/image/wallpaper${Math.floor(Math.random() * 10) + 1}.avif`
  );

  const createFolder = (name, position) => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name,
      type: "folder",
      position,
      icon: "📁",
      children: [],
    };
    setDesktopItems((prev) => [...prev, newFolder]);
  };

  const createFile = (name, position, content = "") => {
    const newFile = {
      id: `file-${Date.now()}`,
      name,
      type: "file",
      position,
      icon: "📄",
      content,
    };
    setDesktopItems((prev) => [...prev, newFile]);
  };

  const deleteItem = (id) => {
    setDesktopItems((prev) => prev.filter((item) => item.id !== id));
  };

  const renameItem = (id, newName) => {
    setDesktopItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: newName } : item))
    );
  };

  const moveItem = (id, position) => {
    setDesktopItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, position } : item))
    );
  };

  return (
    <DesktopContext.Provider
      value={{
        desktopItems,
        createFolder,
        createFile,
        deleteItem,
        renameItem,
        moveItem,
        wallpaper,
        setWallpaper,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error("useDesktop must be used within a DesktopProvider");
  }
  return context;
}
