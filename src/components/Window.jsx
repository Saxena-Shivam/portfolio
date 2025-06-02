"use client";

import { useState, useRef, useEffect } from "react";
import { useWindows } from "../contexts/WindowContext";

export default function Window({ window }) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindows();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  // Responsive: detect mobile/tablet
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const handleMouseDown = (e) => {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains("window-header")
    ) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y,
      });
      focusWindow(window.id);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !window.isMaximized && !isMobile) {
      updateWindowPosition(window.id, {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset]);

  if (window.isMinimized) {
    return null;
  }

  // Responsive window style
  let windowStyle;
  if (window.isMaximized || isMobile) {
    windowStyle = {
      position: "fixed",
      top: isMobile ? 0 : 32,
      left: isMobile ? 0 : 64,
      right: 0,
      bottom: isMobile ? 64 : 0, // leave space for mobile bottom bar
      width: isMobile ? "100vw" : "calc(100vw - 64px)",
      height: isMobile ? "100vh" : "calc(100vh - 32px)",
      zIndex: window.zIndex,
      maxWidth: "100vw",
      maxHeight: "100vh",
      minWidth: "0",
      minHeight: "0",
      borderRadius: isMobile ? 0 : "0.5rem",
    };
  } else {
    windowStyle = {
      position: "fixed",
      left: window.position.x,
      top: window.position.y,
      width: window.size.width,
      height: window.size.height,
      zIndex: window.zIndex,
      minWidth: 220,
      minHeight: 120,
      maxWidth: "100vw",
      maxHeight: "100vh",
    };
  }

  return (
    <div
      ref={windowRef}
      className={`bg-white shadow-2xl overflow-hidden animate-slideIn flex flex-col ${
        isMobile ? "rounded-none" : "rounded-lg"
      }`}
      style={windowStyle}
      onClick={() => focusWindow(window.id)}
    >
      {/* Window Header */}
      <div
        className="window-header bg-gray-100 border-b border-gray-200 h-10 flex items-center justify-between px-2 sm:px-4 cursor-move select-none"
        onMouseDown={handleMouseDown}
        style={{
          touchAction: isMobile ? "none" : "auto",
          minHeight: 40,
        }}
      >
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <button
              onClick={() => closeWindow(window.id)}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              aria-label="Close"
            />
            <button
              onClick={() => minimizeWindow(window.id)}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
              aria-label="Minimize"
            />
            <button
              onClick={() => maximizeWindow(window.id)}
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
              aria-label="Maximize"
            />
          </div>
        </div>
        <div className="text-xs sm:text-sm font-medium text-gray-700 flex-1 text-center truncate">
          {window.title}
        </div>
        <div className="w-12 sm:w-16" /> {/* Spacer for centering */}
      </div>

      {/* Window Content */}
      <div
        className="flex-1 overflow-auto"
        style={{
          height: "calc(100% - 40px)",
          minHeight: 0,
          minWidth: 0,
          padding: isMobile ? 4 : 0,
        }}
      >
        {window.component}
      </div>
    </div>
  );
}
