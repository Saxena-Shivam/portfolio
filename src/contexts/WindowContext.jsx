"use client"

import { createContext, useContext, useState } from "react"

const WindowContext = createContext(undefined)

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState([])
  const [nextZIndex, setNextZIndex] = useState(1000)

  const openWindow = (id, title, component) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id)
      if (existing) {
        return prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w))
      }

      const newWindow = {
        id,
        title,
        component,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100 + prev.length * 30, y: 100 + prev.length * 30 },
        size: { width: 800, height: 600 },
        zIndex: nextZIndex,
      }

      return [...prev, newWindow]
    })
    setNextZIndex((prev) => prev + 1)
  }

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }

  const minimizeWindow = (id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)))
  }

  const maximizeWindow = (id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)))
  }

  const focusWindow = (id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex } : w)))
    setNextZIndex((prev) => prev + 1)
  }

  const updateWindowPosition = (id, position) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position } : w)))
  }

  const updateWindowSize = (id, size) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)))
  }

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}

export function useWindows() {
  const context = useContext(WindowContext)
  if (!context) {
    throw new Error("useWindows must be used within a WindowProvider")
  }
  return context
}
