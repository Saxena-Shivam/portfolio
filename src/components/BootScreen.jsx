"use client"

import { useEffect, useState } from "react"

export default function BootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState("Initializing system...")

  const bootMessages = [
    "Initializing system...",
    "Loading kernel modules...",
    "Starting desktop environment...",
    "Loading user profile...",
    "Welcome to Portfolio OS",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2
        const messageIndex = Math.floor((newProgress / 100) * bootMessages.length)
        if (messageIndex < bootMessages.length) {
          setCurrentMessage(bootMessages[messageIndex])
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return newProgress
      })
    }, 60)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white">
      <div className="mb-8">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Portfolio OS</h1>
        <p className="text-gray-300">{currentMessage}</p>
      </div>

      <div className="w-64 bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mt-4 text-sm text-gray-400">{progress}%</div>
    </div>
  )
}
