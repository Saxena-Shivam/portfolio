"use client"

import { useState, useRef, useEffect } from "react"
import { useWindows } from "../contexts/WindowContext"

export default function Window({ window }) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } =
    useWindows()
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef(null)

  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains("window-header")) {
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y,
      })
      focusWindow(window.id)
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && !window.isMaximized) {
      updateWindowPosition(window.id, {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragOffset])

  if (window.isMinimized) {
    return null
  }

  const windowStyle = window.isMaximized
    ? {
        position: "fixed",
        top: 32,
        left: 64,
        right: 0,
        bottom: 0,
        width: "calc(100vw - 64px)",
        height: "calc(100vh - 32px)",
        zIndex: window.zIndex,
      }
    : {
        position: "fixed",
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
      }

  return (
    <div
      ref={windowRef}
      className="bg-white rounded-lg shadow-2xl overflow-hidden animate-slideIn"
      style={windowStyle}
      onClick={() => focusWindow(window.id)}
    >
      {/* Window Header */}
      <div
        className="window-header bg-gray-100 border-b border-gray-200 h-10 flex items-center justify-between px-4 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <button
              onClick={() => closeWindow(window.id)}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            />
            <button
              onClick={() => minimizeWindow(window.id)}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
            />
            <button
              onClick={() => maximizeWindow(window.id)}
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
            />
          </div>
        </div>
        <div className="text-sm font-medium text-gray-700 flex-1 text-center">{window.title}</div>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto" style={{ height: "calc(100% - 40px)" }}>
        {window.component}
      </div>
    </div>
  )
}
